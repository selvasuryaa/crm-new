const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const admin = require("../MODEL/Admin");

//insert data
router.post("/registerUser", (req, res) => {
    let username = req.body.username
    let userDetails = req.body
    console.log(req.body)
    admin.find({ username: username })
        .then((out) => {

            console.log('username exist response', out)
            if (out.length == 1) {
                console.log('name response length', out.length)
                res.json({ "status": 2, "msg": "username Exist" })
            }
            else {
                admin.insertMany(userDetails)
                    .then((out) => {
                        console.log('success response', out)
                        res.json({ "status": 1, "msg": "registered success", "Data": out })

                    })
                    .catch((err) => {
                        console.log('error', err)
                        res.json({ "status": 0, "msg": "not registered " })
                    })
            }
        })
})
// login
router.post("/loginUser", (req, res) => {
    let username = req.body.username
    let password = req.body.password

    const user = { id: username, role: 'admin' }

    admin.find({ username: username })
        .then((result) => {
            console.log(result)

            if (result.length == 0) {
                res.json({ "status": 0, "message": "username wrong" })
            } else {
                if (result[0].password == password) {

                    let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                    console.log("Token admin router", token)
                    res.json({ "status": 2, "msg": "login success", "accessToken": token })
                } else {
                    res.json({ "status": 1, "message": "password wrong" })
                }
            }
        })
        .catch((err) => {
            res.json({ "status": 0, "msg": "login invalid", "error": err })
        })
})

// for sample
router.get('/getAdminData', (req, res) => {
    admin.find()
        .then((result) => {
            // console.log(res)
            res.json({ Data: result })
        })
        .catch(err => {
            console.log(err)
            res.json({ Error: err })
        })
})
// for sample
router.delete('/deleteAdmin/:id', (req, res) => {

    admin.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.json({ Data: result })
            // console.log('deleted data', result)
        })
        .catch(err => {
            console.log(err)
            res.json({ Error: err })
        })
})
module.exports = router