const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const customer = require("../MODEL/Customer");


//insert data
router.post("/regcustomer", (req, res) => {
	console.log(req.body);
	let new_customer = req.body;
	customer
		.insertMany(new_customer)
		.then((result) => {
			res.json({ status: 1, msg: "registered success" });
		})
		.catch((err) => {
			res.json({ status: 0, msg: "not registered ", err });
		});
});

//Read data
router.get("/getcustomerList", (req, res) => {
	customer
		.find()
		.then((data) => {
			res.json({ Data: data });

		})
		.catch((err) => {
			res.json({ Error: err });
		});
});

//update data
router.put("/editcustomerdata/:id", (req, res) => {
	console.log(req.params);
	let dataToEdit = req.body;
	// let id= req.params.id

	customer
		.updateOne({ _id: req.params.id }, { $set: dataToEdit })
		.then((result) => {
			console.log(result)
			res.json({ status: 1, msg: "updated success", "response":result });
			// console.log(json.parse(status, msg))
		})
		.catch((err) => {
			res.json({ status: 0, msg: "not updated" });
		});
});

//delete data
router.delete("/deletecustomerdata/:id", (req, res) => {
	// console.log(req.params)
	// let dataToEdit = req.body
	// let id= req.params.id

	customer
		.deleteOne({ _id: req.params.id })
		.then((result) => {
			res.json({ status: 1, msg: "deleted success" });
		})
		.catch((err) => {
			res.json({ status: 0, msg: "not deleted" });
		});
});

//get single data using id
router.get("/getsinglecustomerdata/:id", (req, res) => {
	customer
		.find({ _id: req.params.id })
		.then((result) => {
			res.json({
				status: 1,
				msg: "getting data sucess",
				result: result,
			});
		})
		.catch((err) => {
			res.json({ status: 0, msg: "not getting data" });
		});
});

//get data depend on Query
router.get("/getcustomerdata/:membership", (req, res) => {
	console.log(req.headers)
	customer
		.find({ membership: req.params.membership })
		.then((result) => {

			res.json({
				status: 1,
				msg: "getting membership data sucess",
				result: result,
			});
		})
		.catch((err) => {
			res.json({
				status: 0,
				msg: " getting membership data failure",
				Error: err,
			});
		});
});

module.exports = router;
