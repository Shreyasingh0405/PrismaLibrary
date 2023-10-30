const express = require("express")
const routes = express.Router()
const controler = require("../controllers/userController")
const postController = require("../controllers/postController")
const middleware = require("../middleware/trackUserStatus")

//user
routes.post('/signUp', controler.signUp)
routes.post('/login', controler.login)
routes.get('/logOut', controler.logOut)

//postData
routes.post("/createPost", middleware, postController.createPost)
routes.post("/update", middleware, postController.updatePost)
routes.post("/delete", middleware, postController.deletePost)
routes.get("/getAllData", postController.getPost)

module.exports = routes