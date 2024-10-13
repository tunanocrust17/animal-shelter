const {Router} = require('express');
const adoptRouter = Router();
// const adoptController = require('../controllers/adoptController')
const {AdoptController} = require('../controllers/adoptController')

const adoptController = new AdoptController()

adoptRouter.get('/', async (req, res) => {
    adoptController.getAllAnimals(req, res)
})

adoptRouter.get('/:species', async (req, res) => {
    adoptController.getBySpecies(req, res)
})

module.exports = {
    adoptRouter
}