const express = require("express")
const router = express.Router()

const conn = require('../dbconfig.js')
const { body, param, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
router.use(express.json())

// 회원가입
router.post("/join",
    [body("userId").notEmpty().withMessage("아이디 비어있음"),
    body("userPW").notEmpty().withMessage("비밀번호 비어있음")],
    (req, res, next) => {
        const { userId, userPW } = req.body;
        let sql = `INSERT INTO users (id, password) VALUES (?,?)`;
        let values = [userId, userPW]
        conn.query(sql, values, (err, results, field) => {
            if (err) {
                console.log(err)
                res.status(400).json({ message: '에러를 처리하는 메세지(회원가입 오류)' })
            } else {
                res.status(201).json(results);
            }
        })
    })
    
//로그인
router.post("/login",
    [body("userId").notEmpty().withMessage("아이디 비어있음"),
    body("userPW").notEmpty().withMessage("비밀번호 비어있음")],
    (req, res, next) => {
        const { userId, userPW } = req.body;
        console.log(userId, userPW)
        let sql = `SELECT * FROM users WHERE id = ?`;
        conn.query(sql, userId, (err, results, field) => {
            if (err) {
                console.log(err)
                res.status(400).json({ message: '에러를 처리하는 메세지(로그인 오류)' })
            }
            let loginUser = results[0]
            if(loginUser && loginUser.password === userPW) {
                const token = jwt.sign(
                    {
                        userId : loginUser.id,
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "3h",
                        issuer : "changchangwoo"
                    }
                )
                res.status(200).json({
                    userId : userId,
                    token : token
                }) // 로그인 성공을 알리는 메세지
            } else {
                res.status(200).json({message : '로그인 실패를 알리는 메세지'})
            }

        })
    })

module.exports = router