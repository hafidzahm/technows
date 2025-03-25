require('dotenv').config()
const express = require('express')
const UserController = require('./controllers/UserController')
const errorHandling = require('./middleware/errorHandling')
const NewsController = require('./controllers/NewsController')
const PrivateController = require('./controllers/PrivateController')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res, next) => {
  res.json('hello woOoOoOOoorld!')
})

app.post('/users', UserController.registerUser)
app.post('/login', UserController.loginUser)
app.get('/tech', NewsController.getAllNews)
app.get('/detail', NewsController.getDetailNews)
// ---------------------------------------------------------
// =========MIDDLEWARE AUTHENTICATION AND AUTHORIZATION=====
// ---------------------------------------------------------

// MELIHAT SEMUA BERITA YG DIBOOKMARK USER
app.get('/bookmark', PrivateController.getMyBookmark)
// MENAMBAH KE DAFTAR BOOKMARK
// MENGHAPUS DARI DAFTAR BOOKMARK


// ----------------------------------------------------------
// ======================ERROR HANDLING======================
// ----------------------------------------------------------
app.use(errorHandling)

module.exports = app

