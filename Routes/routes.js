const express = require('express')
const route = new express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const userController =  require('../controller/userController')
const blogController =  require('../controller/blogContoller')
const adminMiddleware = require('../middleware/adminMiddleware')

route.post('/register',userController.regController)
route.post('/login',userController.loginController)
route.get('/user/:id',userController.userDetailsController)

route.post('/add-blog',authMiddleware,blogController.createBlogController)
route.get('/all-blogs',authMiddleware,blogController.getAllBlogController)
route.put('/update-blog/:id',adminMiddleware,blogController.editBlogController)
route.put('/delet-blog/:id',adminMiddleware,blogController.deleteBlogController)
route.put('/add-comments/:id',blogController.addCommentController)

module.exports = route