const {AnimalClass} = require('../db/queries')
const {FormData} = require('../db/queries')

class AnimalController{
    async getAllAnimalsSorted (req, res) {
        try {
            const animals = await AnimalClass.getAllAnimalsSorted()
            if(animals){
                res.render('./admin/adminDashboard', {
                    title: "All Animals",
                    intro: "Meet the Paws That Need a Home!",
                    animals: animals
                })
                
            } else {
                res.status(404).json({message: 'No animals found'})
            }
        } catch(err) {
            res.status(500).json({error: 'Error fetching animals'})
        }
    }

    async createAnimal(req, res) {
        const {name, species, age, age_units, gender, weight, weight_unit, img, adopted, hobbies, quirks} = req.body
        
        // Ensure hobbies and quirks are arrays (could be empty arrays)
        if (!Array.isArray(hobbies) || !Array.isArray(quirks)) {
            return res.status(400).json({ error: "Hobbies and quirks must be arrays" });
        }
        console.log(hobbies)
        console.log(quirks)

        try {
            await AnimalClass.createAnimal(name, species, age, age_units, gender, weight, weight_unit, img, adopted, hobbies, quirks);
            
            res.redirect('dashboard');
        } catch (error) {
            console.error('Error creating animal:', error);
            res.status(500).send('Error creating animal');
        }
    }

    async getCreateAnimal (req, res) {
        const hobbies = await FormData.getHobbies()
        const quirks = await FormData.getQuirks()
        try {
            res.render('./admin/createAnimal', {
                hobbies: hobbies,
                quirks: quirks
            })
        } catch (error) {
            console.error('error fetching hobbies or quirks: ', error)
        }
    }

    async getUpdateAnimal (req, res) {

        const animal_ID = parseInt(req.params.id)

        try {
            const animal = await AnimalClass.getAnimalByID(animal_ID)

            const allHobbies = await FormData.getHobbies()
            const animalHobbies = await AnimalClass.getAnimalHobbies(animal_ID)
            // Extract hobby_ids for easier comparison
            const animalHobbiesIDs = animalHobbies.map(hobby => hobby.hobby_id)

            const allQuirks = await FormData.getQuirks()
            const animalQuirks = await AnimalClass.getAnimalQuirks(animal_ID)
            const animalQuirksIDs = animalQuirks.map(quirk => quirk.quirk_id)

            res.render('./admin/updateAnimal', {
                title: animal.name,
                animal: animal,
                hobbies: allHobbies, 
                animalHobbiesIDs: animalHobbiesIDs,
                quirks: allQuirks,
                animalQuirksIDs: animalQuirksIDs
            })
        } catch (error) {
            console.error('error fetching get update animal page', error)
        }
    }

    async postUpdateAnimal (req, res) {

        let {animal_id, name, species, age, age_units, gender, weight, weight_unit, img, adopted, hobbies, quirks} = req.body

        let newAnimal_id = parseInt(animal_id)

        if (!Array.isArray(hobbies)) {
            hobbies = hobbies ? [hobbies] : [];
        }
        if (!Array.isArray(quirks)) {
            quirks = quirks ? [quirks] : [];
        }


        console.log(newAnimal_id)
        console.log(typeof(newAnimal_id))
        try {
            await AnimalClass.updateAnimal(newAnimal_id, name, species, age, age_units, gender, weight, weight_unit, img, adopted, hobbies, quirks)
            res.redirect('dashboard')
        } catch (error) {
            console.error('Error updating animal: ', error)
            res.status(500).send('Error updating animal');
        }
    }

    
}
    


module.exports = {
    AnimalController
}