const mongoose = require('mongoose')
const connection_string = process.env.CONNECTION_STRING

mongoose.connect(connection_string).then(res=>{
    console.log("server connected with mongoDb");
    
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
    
    
})
