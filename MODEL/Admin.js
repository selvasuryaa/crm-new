const mongoose = require("mongoose")

let adminSchema = mongoose.Schema({
    
    // name:String,
    // username:String,
    username:String,
    // phone:String,
    password:String
    
})

module.exports = mongoose.model("ADMIN",adminSchema)