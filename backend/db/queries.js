const db = require('../data/animalData')

async function getAllItems() {
    const dogData = db.dogData
    const catData = db.catData
    const allItems = dogData.concat(catData)
    return allItems;
}

async function getBySpecies(id) {
    const dogData = db.dogData
    const catData = db.catData
    const allItems = dogData.concat(catData)
    const allSpeciies = allItems.filter( species => species.speciesID === id)
    return allSpeciies;
}

async function getItem(id) {
    const dogData = db.dogData
    const catData = db.catData
    const allItems = dogData.concat(catData)
    let animal = allItems.find( (animal) => animal.id === id)
    return animal
}

module.exports = {
    getAllItems,
    getBySpecies,
    getItem
}