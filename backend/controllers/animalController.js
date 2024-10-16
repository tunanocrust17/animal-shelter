const {AnimalClass} = require('../db/queries')

class AnimalController{
    async getAllAnimals (req, res) {
        try {
            const animals = await AnimalClass.getAllAnimals()
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
        const {name, species, age, age_units, gender, weight, weight_unit, img, adopted} = req.body

        try {
            await AnimalClass.createAnimal(name, species, age, age_units, gender, weight, weight_unit, img, adopted);
            res.redirect('dashboard');
        } catch (error) {
            console.error('Error creating animal:', error);
            res.status(500).send('Error creating animal');
        }
    }
}

module.exports = {
    AnimalController
}