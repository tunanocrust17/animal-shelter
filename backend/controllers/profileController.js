const {AnimalClass} = require('../db/queries')

class ProfileController {
    async getAnimalByID(req, res) {
        const animalID = parseInt(req.params.id)

        try {
            //Get animal information
            const animal = await AnimalClass.getAnimalByID(animalID)
            const hobbies = await AnimalClass.getAnimalHobbies(animalID)
            const quirks = await AnimalClass.getAnimalQuirks(animalID)
            console.log(quirks)
            res.render('animalProfile', {
                title: animal.name,
                intro: animal.about,
                animal: animal,
                hobbies: hobbies,
                quirks: quirks
            })
        } catch(error){
            console.error('Error finding animal: ', error);
            res.status(500).send('Error finding animal')
        }
    }
}

module.exports = {
    ProfileController
}