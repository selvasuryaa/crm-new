const mongoose = require("mongoose")

let customerSchema = mongoose.Schema({
    
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    membership:String
    
})

module.exports = mongoose.model("CUSTOMER",customerSchema)