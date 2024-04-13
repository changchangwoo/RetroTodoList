const conn = require('../dbconfig.js')
const { body, param, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const crypto = require("crypto"); // crypto 모듈 : 암호화
require("dotenv").config()

const check = (req, res) => {
    const {userId} = req.body;
    console.log(userId)
    let sql = `SELECT * FROM users WHERE id = ?`
    conn.query(sql, userId, (err, results) => {
        console.log(results.length)
        if(results.length > 0) {
            console.log(err)
            res.status(400).send("에러")
        } else {
            res.status(200).send("성공")
        }
    })
};

const join = (req, res) => {
    const { userId, userPW } = req.body;
    const salt = crypto.randomBytes(64).toString("base64");
    const hashPassword = crypto
    .pbkdf2Sync(userPW, salt, 100, 10, "sha512")
    .toString("base64");
    let sql = `INSERT INTO users (id, password, salt) VALUES (?,?,?)`;
    let values = [userId, hashPassword, salt]
    conn.query(sql, values, (err, results, field) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: '에러를 처리하는 메세지(회원가입 오류)' })
        } else {
            res.status(201).json(results);
        }
    })
};

const login = (req, res) => {
    const { userId, userPW } = req.body;
    console.log(userId, userPW)
    let sql = `SELECT * FROM users WHERE id = ?`;
    conn.query(sql, userId, (err, results, field) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: '에러를 처리하는 메세지(로그인 오류)' })
        }
        let loginUser = results[0]
        console.log(loginUser)
        const hashPassword = crypto
        .pbkdf2Sync(userPW, loginUser.salt, 100, 10, "sha512")
        .toString("base64");
        if(loginUser && loginUser.password === hashPassword) {
            let token = jwt.sign(
                {
                    userId : loginUser.id,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "3h",
                    issuer : "changchangwoo"
                }
            )
            res.cookie('id', token, { httpOnly: true }); // 쿠키로 사용자에게 토큰을 응답한다
            res.status(200).send('동작완료')
        } else {
            return res.status(400).json({message : '로그인 실패를 알리는 메세지'})
        }
    }
    )
};

module.exports = {check, join, login}