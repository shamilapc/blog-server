const { json } = require("express");
const jwt = require("jsonwebtoken")

const adminMiddleware = (req, res, next) => {
    console.log("inside auth middleware");
    const token = req.headers['authorization'].split(" ")[1]
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET)
            console.log(jwtResponse);
            req.payload = jwtResponse.userEmail
            const role = jwtResponse.role
            if (role == 'author') {
                next()
            }
            else {
                res.status(401).json("Authorization failed...Unauthorized user")
            }

        } catch (err) {
            res.status(401).json("Authorization failed...Please Login")
        }
    }
    else {
        res.status(401).json("authorization failed... token is missing")
    }
}
module.exports = adminMiddleware