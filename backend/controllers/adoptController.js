const queries = require('../db/queries')
const {AnimalClass} = require('../db/queries')


class AdoptController {
    async getAllAnimals (req, res) {
        try {
            const animals = await AnimalClass.getAllAnimals()
            if(animals){
                res.render('adopt', {
                    title: "All Animals",
                    intro: "Meet the Paws That Need a Home!",
                    items: animals
                })
                
            } else {
                res.status(404).json({message: 'No animals found'})
            }
        } catch(err) {
            res.status(500).json({error: 'Error fetching animals'})
        }
    }

    async getBySpecies(req, res) {
        const species = req.params.species
        try {
            const animals = await AnimalClass.getBySpecies(species)
            res.render('adopt', {
                title: animals[0].species,
                intro: 'Meet the Paws That Need a Home!',
                items: animals
            })
        } catch(err) {
            console.error('Error finding animals: ', err);
            res.status(500).send('Error finding animals')
        }
    }
}

module.exports = {
    AdoptController
}