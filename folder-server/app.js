require('dotenv').config()
const express = require('express')
const UserController = require('./controllers/UserController')
const errorHandling = require('./middleware/errorHandling')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res, next) => {
  res.send('PortalIndo')
})
app.get('/users', (req, res, next) => {
  res.send('PortalIndo')
})
app.post('/users', UserController.registerUser)

app.use(errorHandling)

module.exports = app

