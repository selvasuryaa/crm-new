const express = require("express");
const router = express.Router()
// const jwt = require("jsonwebtoken")
const  product = require("../MODEL/Product");

//insert data
router.post("/regproduct",(req,res)=>{
    console.log(req.body)
    let  new_product = req.body;
    product.insertMany(new_product)
            .then((result)=>{
                res.json({"status":1,"msg":"registered success",result})

            })
            .catch((err)=>{
                res.json({"status":0,"msg":"not registered ",err})
            })
})

//Read data
router.get("/getproductlist",(req,res)=>{
    product.find()
            .then((data)=>{
                // res.send(data)
                res.json({"Data":data})
            })
            .catch((err)=>{
                res.json({"Error":err})
            })
})

//update data
router.put("/editproductdata/:id",(req,res)=>{
    console.log(req.params)
    let dataToEdit = req.body
    // let id= req.params.id

    product.updateOne({_id:req.params.id},{$set:dataToEdit})
        .then((result)=>{
            res.json({"status":1,"msg":"updated success"})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":"not updated"})
        })
    })

//delete data
router.delete("/deleteproductdata/:id",(req,res)=>{
    // console.log(req.params)
    // let dataToEdit = req.body
    // let id= req.params.id

    product.deleteOne({_id:req.params.id})
        .then((result)=>{
            res.json({"status":1,"msg":"deleted success"})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":"not deleted"})
        })
    })
    
//get single data using id
router.get("/getsingleproductdata/:id",(req,res)=>{
    
    product.find({_id:req.params.id})
        .then((result)=>{
            res.json({"status":1,"msg":"getting data sucess","result":result})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":"not getting data"})
        })
    })

//get data depend on the given data using id n prop
router.get("/getproductdata/:product",(req,res)=>{
    
    product.find({membership:req.params.membership})
        .then((result)=>{
            res.json({"status":1,"msg":"getting membership data sucess","result":result})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":" getting membership data failure","Error":err})
        })
    })

module.exports = router