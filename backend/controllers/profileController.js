const {AnimalClass} = require('../db/queries')

class ProfileController {
    async getAnimalByID(req, res) {
        const animalID = parseInt(req.params.id)

        try {
            const animal = await AnimalClass.getAnimalByID(animalID)
            res.render('animalProfile', {
                title: animal.name,
                intro: animal.about,
                animal: animal
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