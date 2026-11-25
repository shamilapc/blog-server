const {json} = require('express')
const bcrypt = require('bcrypt')

const users = require('../models/userModel')
const jwt = require('jsonwebtoken')


exports. regController = async(req,res)=>{
    console.log("inside regController")
    const {username, email, password} = req.body
    const exiUser = await users.findOne({email})
    if(exiUser){
        res.status(409).json("please login")
    }
    else{
        const encrpass =  await bcrypt.hash(password,10)
        const newUser = await users.create({username,email,password:encrpass})
        res.status(200).json(newUser)

    }
    
    
}


exports.loginController = async(req,res)=>{
    console.log("inside loginController")
    const {email,password} = req.body
    const exUser = await users.findOne({email})
    if(exUser){
        const passmatch = await bcrypt.compare(password,exUser.password)
        if(passmatch){
            const token = jwt.sign({userEmail:email},process.env.JWT_SECRETKEY)
            res.status(200).json({user:exUser,token})
        }
        else{
            
            res.status(409).json("invalid password")
        }
    }
    else{
         res.status(409).json("please register")
    } 

    
    
}


exports.allUserController = async (req, res) => {
    console.log("inside allUserController")
    const userList = await users.find()
    res.status(200).json(userList)
}

exports.userDetailsController = async (req, res) => {
    console.log("inside userDetailsController")
    const {id} = req.params
    const userDet = await users.findById({_id:id})
    res.status(200).json(userDet)
}