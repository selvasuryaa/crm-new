const jwt = require('jsonwebtoken')
require('dotenv').config()

function checkAuth (req, res, next){    
	const authHeader = req.headers.authorization	

	if (!authHeader) {
     res.sendStatus(401); // Unauthorized: No token provided
    }

	const token = authHeader && authHeader.split(" ")[1]
	console.log("Extracted TOKEN is =>", token)
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
		if (err) {
			 res.sendStatus(403) //Token not Verified
		}
		else{
			console.log("decoded", decodedUser)
			req.decodedUser = decodedUser
			console.log('ss',decodedUser.role)
		}
	})
	next()
}

module.exports = checkAuth