const mongoose = require("mongoose")

let productSchema = mongoose.Schema({
    
    productname:String,
    categoryname:String,
    price:String,
    totalinstock:String
    
})

module.exports = mongoose.model("PRODUCT",productSchema)