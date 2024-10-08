const {Router} = require('express');
const adoptRouter = Router();
const adoptController = require('../controllers/adoptController')


adoptRouter.get('/' , async (req, res) => {
    adoptController.getAllItems(req, res)
})

adoptRouter.get('/:id', async (req, res) => {
    adoptController.getSpecies(req, res)
})

module.exports = {
    adoptRouter
}