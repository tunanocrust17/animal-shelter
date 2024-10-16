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
        
        const result = req.params.species
        const species = result.charAt(0).toUpperCase() + result.slice(1)

        try {
            const animals = await AnimalClass.getBySpecies(species)
            
            if(animals && animals.length > 0 ) {
                res.render('adopt', {
                    title: animals[0].species,
                    intro: 'Meet the Paws That Need a Home!',
                    items: animals
                })
            } else {
                res.render('adopt', {
                    title: 'No animals found',
                    intro: 'Sorry, no animals available in this category',
                    items: []
                })
            }
        } catch(err) {
            console.error('Error finding animals: ', err);
            res.status(500).send('Error finding animals')
        }
    }
}

module.exports = {
    AdoptController
}