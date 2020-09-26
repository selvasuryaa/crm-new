const express = require("express");
const router = express.Router()
// const jwt = require("jsonwebtoken")
const  admin = require("../model/admin");

//insert data
router.post("/regadmin",(req,res)=>{
    let usename = req.body.username
    console.log(req.body)
    admin.find({username:usename})
        .then((out)=>{
            if(out.length==0){
                res.json({"status":"username Exist"})
            }else{
                admin.insertMany(usename)
                .then((out)=>{
                    res.json({"status":1,"msg":"registered success"})
    
                })
                .catch((err)=>{
                    res.json({"status":0,"msg":"not registered "})
                })
            }
        })

})


        
// login
router.post("/login",(req,res)=>{
    let uname = req.body.email
    let paswrd = req.body.phone
    // let email = req.params.username
    // let phone = req.params.paswrd
console.log(req.body)
console.log(uname)
    admin.find({email:uname})
        .then((result)=>{
            
console.log(result)

            if(result.length==0){
                res.json({"status":"username wrong"})
            }else{
                if(result[0].phone==paswrd){
                    let token = jwt.sign({userId:uname},"mysecret",{expiresIn:'2d'})
                    res.json({"status":1,"msg":"login success","result":result,"token":token})
                }else{
                 res.json({"status":"password wrong"})
                }

            }

        })
        .catch((err)=>{
            res.json({"status":0,"msg":"login invalid","error":err})
        })
})

module.exports = router