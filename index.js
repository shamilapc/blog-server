
const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/db')
const server = express()
const routes = require('./Routes/routes')

server.use(cors())
server.use(express.json())
server.use(routes)

const PORT = process.env.PORT

server.listen(PORT,()=>{
    console.log("server running waiting for client request");
    
}  
)

server.use((err,req,res,next)=>{
    res.status(500).json(err.message)
})

server.get('/',(req,res)=>{
    res.status(200).send("<p>server running</p>")
})