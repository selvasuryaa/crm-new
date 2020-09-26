const express = require("express"); //framework
const mongoose = require("mongoose"); //bridge bw frontend n backend
const Admin_router = require("./CRM_ROUTER/Admin_router");
const Customer_router = require("./CRM_ROUTER/Customer_router");
const Order_router = require("./CRM_ROUTER/Order_router");
const Product_router = require("./CRM_ROUTER/Product_router");
const cors = require("cors");
require("dotenv").config();

const app = express(); //server initialization

const PORT = process.env.PORT || 5000;

const url =
	"mongodb+srv://selva:selva@cluster0.tquoj.mongodb.net/crmDB?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
	console.log("mongoDB connected");
});

mongoose.connection.on("error", (err) => {
	console.log("mongoDB not connected", err);
});

//third party module
app.use(express.json()); //instead of using bodyParser 3rd party module,now we can be using the express.json() for changing the data in json format.server to mongoDB data transaction should be in json.
app.use(cors());
//local middleware
app.use("/admin", Admin_router);
app.use("/customer", Customer_router);
app.use("/order", Order_router);
app.use("/product", Product_router);

// app.get("/", (req, res) => {
// 	//to check whether server working or not
// 	res.send("welcome to my page");
// });

if (
	process.env.NODE_ENV === "production" ||
	process.env.NODE_ENV === "staging"
) {
	app.use(express.static("client/build"));
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname + "/client/build/index.html"));
	});
} else {
	app.get("/", (req, res) => {
		//to check whether server working or not
		res.send("welcome to my page");
	});
}

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
