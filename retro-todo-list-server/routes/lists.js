const express = require("express")
const router = express.Router()

const conn = require('../dbconfig.js')
const { body, param, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const jwtHandler = require("../utils/jwt.js")
require("dotenv").config()
router.use(express.json())

const validate = (req, res, next) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
        return next()
    } else {
        console.log(err)
        return res.status(400).json(err.array())
    }
}

// 리스트 추가
router.post("/",
    [body("context").notEmpty().isString().withMessage("내용이 비어있음"),
    body("token").notEmpty().isString().withMessage("사용자 아이디가 비어있음"),
        validate],
    (req, res, err) => {
        const { token, context } = req.body;
        let sql = `INSERT INTO lists (context, user_id) VALUES (?,?)`;
        let decodedToken = jwtHandler.decodeToken(token)
        let userId = decodedToken.userId
        let values = [context, userId]
        conn.query(sql, values, (err, results, field) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: '에러를 처리하는 메세지(리스트 추가 오류)' })
            } else {
                return res.status(201).json(results);
            }
        })
    })

// 리스트 출력
router.get("/",
    (req, res, next) => {
        const authHeader = req.headers['authorization'];
        let decodedToken = jwtHandler.decodeToken(authHeader)
        let token = decodedToken.userId
        let sql = `SELECT * FROM lists WHERE user_id = ?`;
        conn.query(sql, token, (err, results, field) => {
            if (err) {
                return res.status(400).json({ message: '에러를 처리하는 메세지(리스트 출력 오류)' })
            } else {
                return res.status(200).json(results)
            }
        })
    })

// 리스트 개별 삭제
router.delete("/:id",
    [param("id").notEmpty().isString().withMessage("쿼리스트링 비어있음"),
        validate],
    (req, res, next) => {
        const userId = Number(req.params.id)
        let sql = `DELETE FROM lists WHERE id = ?`
        conn.query(sql, userId, (err, results, field) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: '에러를 처리하는 메세지(리스트 개별 삭제)' })
            } else {
                return res.status(200).json(results)
            }
        })
    })

// 리스트 개별 수정
router.put("/:id/update",
    [param("id").notEmpty().withMessage("쿼리스트링 비어있음"),
    body("context").notEmpty().isString().withMessage("내용이 비어있음")],
    validate,
    (req, res, next) => {
        const context = req.body.context
        const userId = Number(req.params.id)
        let sql = `UPDATE lists SET context =? WHERE id=?`;
        let values = [context, userId]
        conn.query(sql, values, (err, results, field) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: '에러를 처리하는 메세지(리스트 개별 수정)' })
            } else {
                return res.status(200).json(results)
            }
        })
    })

// 리스트 개별 체크확인
router.put("/:id",[
    param("id").notEmpty().withMessage("쿼리스트링 비어있음"),
    body("state").notEmpty().withMessage("상태체크 비어있음")
    ,validate],(req, res, next)=> {
    const id = Number(req.params.id)
    const state = Number(req.body.state)
    if(state === 1) sql = `UPDATE lists SET checked =0 WHERE id=?`
    else sql = `UPDATE lists SET checked =1 WHERE id=?`
    conn.query(sql,id,(err, results, field) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: '에러를 처리하는 메세지(리스트 개별 체크)' })
        } else {
            return res.status(200).send("성공")
        }
    })
})
module.exports = router