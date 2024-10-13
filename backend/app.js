const express = require('express')
const path = require('node:path')
const dotenv = require('dotenv')
const {indexRouter} = require('./routes/indexRouter')
const {adoptRouter} = require('./routes/adoptRouter')
const {profileRouter} = require('./routes/profileRouter')
const {adminRouter} = require('./routes/adminRouter')

const app = express()

//set up the absolute path to use the variables stored in the .env file
dotenv.config({path: path.resolve(__dirname, '../.env')})

//Sets the directory where view (template) files are stored.
app.set('views', path.join(__dirname, '../frontend', 'views'))
app.set('view engine', 'ejs')

//parses incoming data from a post request and makes it available to the req.body
app.use(express.urlencoded({extended: true}))

//defines the css path and makes them available to be served
const assetsPath = path.join(__dirname, '../frontend', 'public')
app.use(express.static(assetsPath))


app.use('/', indexRouter)
app.use('/adopt', adoptRouter)
app.use('/profile', profileRouter)
app.use('/admin', adminRouter)

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server running on ${PORT}`))

