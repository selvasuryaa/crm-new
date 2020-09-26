const mongoose = require("mongoose")

let orderSchema = mongoose.Schema({
    
    orderID:String,
    quantity:String,
    amount:String,
    totalamount:String,
    customer:String,
    orderdate:String,
    shippingdate:String
    
})

module.exports = mongoose.model("ORDER",orderSchema)