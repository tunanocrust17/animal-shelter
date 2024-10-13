const {Router} = require('express')
const profileRouter = Router()
const {ProfileController} = require('../controllers/profileController')

const profileController = new ProfileController()

profileRouter.get('/:id', async (req, res) => {
    profileController.getAnimalByID(req, res)
})

module.exports = {
    profileRouter
}