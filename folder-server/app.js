require("dotenv").config();
const express = require("express");
var cors = require('cors')
const UserController = require("./controllers/UserController");
const errorHandling = require("./middleware/errorHandling");
const NewsController = require("./controllers/NewsController");
const PrivateController = require("./controllers/PrivateController");
const guardLoginMiddleware = require("./middleware/guardLogin");
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({message: "Hello world"});
});

app.post("/users", UserController.registerUser);
app.post("/login", UserController.loginUser);
app.get("/news", NewsController.getAllNews);
app.get("/details", NewsController.getDetailNews);

// ---------------------------------------------------------
// =========MIDDLEWARE AUTHENTICATION AND AUTHORIZATION=====
// ---------------------------------------------------------
// SUMMARIZE NEWS
app.get("/details-summarize", guardLoginMiddleware, NewsController.getSummarizeNews);
// MELIHAT SEMUA BERITA YG DIBOOKMARK USER
app.get("/bookmarks", guardLoginMiddleware, PrivateController.getMyBookmark);
// MENAMBAH KE DAFTAR BOOKMARK
app.post("/bookmarks", guardLoginMiddleware, PrivateController.addBookmark);
// MENGHAPUS DARI DAFTAR BOOKMARK
app.delete("/bookmarks/:bookmarkId", guardLoginMiddleware, authorizationMiddleware, PrivateController.deleteBookmark);
// MENGUBAH STATUS BOOKMARK MENJADI SUDAH DIBACA
app.put("/bookmarks/:bookmarkId", guardLoginMiddleware, authorizationMiddleware, PrivateController.changeStatusBookmark);

// ----------------------------------------------------------
// ======================ERROR HANDLING======================
// ----------------------------------------------------------
app.use(errorHandling);

module.exports = app;
