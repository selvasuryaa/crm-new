const express = require("express");
const router = express.Router()
// const jwt = require("jsonwebtoken")
const  order = require("../MODEL/Order");

//insert data
router.post("/regorder",(req,res)=>{
    console.log(req.body)
    let  new_order = req.body;
    order.insertMany(new_order)
            .then((result)=>{
                res.json({"status":1,"msg":"registered success",result})

            })
            .catch((err)=>{
                res.json({"status":0,"msg":"not registered ",err})
            })
})

//Read data
router.get("/getorderlist",(req,res)=>{
    order.find()
            .then((data)=>{
                // res.send(data)
                res.json({"Data":data})
            })
            .catch((err)=>{
                res.json({"Error":err})
            })
})

//update data
router.put("/editorderdata/:id",(req,res)=>{
    console.log(req.params)
    let dataToEdit = req.body
    // let id= req.params.id

    order.update({_id:req.params.id},{$set:dataToEdit})
        .then((result)=>{
            res.json({"status":1,"msg":"updated success"})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":"not updated"})
        })
    })

//delete data
router.delete("/deleteorderdata/:id",(req,res)=>{
    // console.log(req.params)
    // let dataToEdit = req.body
    // let id= req.params.id

    order.deleteOne({_id:req.params.id})
        .then((result)=>{
            res.json({"status":1,"msg":"deleted success"})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":"not deleted"})
        })
    })
    
//get single data using id
router.get("/getsingleorderdata/:id",(req,res)=>{
    
    order.find({_id:req.params.id})
        .then((result)=>{
            res.json({"status":1,"msg":"getting data sucess","result":result})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":"not getting data"})
        })
    })

//get data depend on the given data using id n prop
router.get("/getorderdata/:membership",(req,res)=>{
    
    order.find({membership:req.params.membership})
        .then((result)=>{
            res.json({"status":1,"msg":"getting membership data sucess","result":result})

        })
        .catch((err)=>{
            res.json({"status":0,"msg":" getting membership data failure","Error":err})
        })
    })

        
//login
// router.post("/login",(req,res)=>{
//     let uname = req.body.email
//     let paswrd = req.body.phone
//     // let email = req.params.username
//     // let phone = req.params.paswrd
// console.log(req.body)
// console.log(uname)
//     student.find({email:uname})
//         .then((result)=>{
            
// console.log(result)

//             if(result.length==0){
//                 res.json({"status":"username wrong"})
//             }else{
//                 if(result[0].phone==paswrd){
//                     let token = jwt.sign({userId:uname},"mysecret",{expiresIn:'2d'})
//                     res.json({"status":1,"msg":"login success","result":result,"token":token})
//                 }else{
//                  res.json({"status":"password wrong"})
//                 }

//             }

//         })
//         .catch((err)=>{
//             res.json({"status":0,"msg":"login invalid","error":err})
//         })
// })

module.exports = router