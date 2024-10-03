const {Router} = require('express')
const animalRouter = Router()
const animalController = require('../controllers/animalController')

animalRouter.get('/:id', async (req, res) => {
    animalController.getItem(req, res)
})

module.exports = {
    animalRouter
}