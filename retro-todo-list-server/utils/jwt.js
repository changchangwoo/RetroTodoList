require("dotenv").config()
const jwt = require("jsonwebtoken")

const TOKEN_KEY = process.env.TOKEN_KEY

const decodeToken = (string) => {
    let token = {}
    jwt.verify(string,TOKEN_KEY, (err, decoded) => {
        if(err) {
            console.log(err)
        } else {
            token = decoded
        }
    })
    return token
}

module.exports = {decodeToken}