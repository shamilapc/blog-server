const blogs = require('../models/blogModel');
const users = require('../models/userModel');

exports.createBlogController = async (req, res, next) => {

    const { title, content } = req.body
    const userMail = req.payload
    const newBlog = await  blogs.create({title,content,userMail})
     res.status(200).json(newBlog)

    
  } 

  exports.getAllBlogController = async (req, res, next) => {

   console.log("inside getAllBlogController");
   
    const allBlogs = await  blogs.find()
     res.status(200).json(allBlogs)

    
  } 

  exports.editBlogController = async (req, res, next) => {

   console.log("inside editBlogController");
   const { title, content } = req.body
   const{id}=req.params
    const userMail = req.payload
     const updateBlog = await  blogs.findByIdAndUpdate({_id:id},{title,content,userMail})
     res.status(200).json(updateBlog)

    
  } 

   exports.deleteBlogController = async (req, res, next) => {

   console.log("inside deleteBlogController");
   const{id}=req.params
     const deleteBlog = await  blogs.findByIdAndDelete({_id:id})
     res.status(200).json(deleteBlog)

    
  } 


exports.addCommentController = async (req, res, next) => {
  console.log("inside addCommentController");
 
    const { id } = req.params;
    const { comment } = req.body;
    const userMail = req.payload;

   

    const existingBlog = await blogs.findById(id)
    if (existingBlog) {
     existingBlog.comments.push({ userMail,comment, date: new Date() })
     await existingBlog.save()
      res.status(200).json(existingBlog)
    }
    else{
        res.status(409).json("no such blog")
    }

}

