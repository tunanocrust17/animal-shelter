const {Router} = require('express')
const adminRouter = Router()
const {AnimalController} = require('../controllers/animalController')

const animalController = new AnimalController()

adminRouter.get('/dashboard', async (req, res) => {
    try {
        await animalController.getAllAnimals(req, res)
    } catch(err) {
        console.error('Error fetching animals: ', err);
        res.status(500).json({error: 'Error fetching animals'})
    }
})

adminRouter.get('/createAnimal', (req, res) => {
    res.render('./admin/createAnimal')
})

adminRouter.post('/', async (req, res) => {
    try{
        await animalController.createAnimal(req, res)
    } catch(err){
        console.error('Error in route handler: ', error);
        res.status(500).send('Internal service error')
    }
})

module.exports = {
    adminRouter
}