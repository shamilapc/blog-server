const { json } = require('express')
const jwt = require('jsonwebtoken')


const authMiddleware = ((req,res,next)=>{

    console.log("inside Authmiddleware");
    
    const token = req.headers['authorization'].split(" ")[1]
    if(token){

       try{
         const jwtResponse = jwt.verify(token,process.env.JWT_SECRETKEY)
        console.log(jwtResponse);
        req.paylaod = jwtResponse.email
        next()
       }
       catch(err){
          res.status(401).json("Authorization failed...Please Login")
          
       }
        

    }
    else{
        res.status(401).json("failed...token missing")
    }

})

module.exports = authMiddleware