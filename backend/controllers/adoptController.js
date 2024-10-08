const queries = require('../db/queries')

async function getAllItems (req, res) {
    const items = await queries.getAllItems();
    console.log(items)
    res.render('adopt', {
        title: "All Animals",
        intro: "Meet the Paws That Need a Home!",
        items: items
    })
}

async function getSpecies (req, res) {
    const speciesID = parseInt(req.params.id)
    const animals = await queries.getBySpecies(speciesID)
    res.render('adopt', {
        title: animals[0].species,
        intro: "Meet the Paws That Need a Home!",
        items: animals
    })
}

module.exports = {
    getAllItems,
    getSpecies
}