require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY;

const decodeToken = (req, res, next) => {
    let token = req.cookies.id;
    if (token) {
        jwt.verify(token, TOKEN_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
            } else {
                req.decodeToken = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ message: "토큰이 필요합니다." });
    }
};

module.exports = decodeToken;
