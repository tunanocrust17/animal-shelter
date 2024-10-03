const queries = require('../db/queries')

async function getItem (req, res) {
    const animalID = parseInt(req.params.id)
    const animal = await queries.getItem(animalID)
    res.render('animalProfile', {
        title: animal.name,
        intro: animal.about,
        animal: animal
    })
}

module.exports = {
    getItem
}