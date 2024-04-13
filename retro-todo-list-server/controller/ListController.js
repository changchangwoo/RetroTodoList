const conn = require('../dbconfig.js')
const jwt = require("jsonwebtoken")
const crypto = require("crypto"); // crypto 모듈 : 암호화
require("dotenv").config()


const postList = (req, res) => {
    const context = req.body.context;
    const userId = req.decodeToken.userId
    let sql = `INSERT INTO lists (context, user_id) VALUES (?,?)`;
    let values = [context, userId]
    conn.query(sql, values, (err, results, field) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: '에러를 처리하는 메세지(리스트 추가 오류)' })
        } else {
            return res.status(201).json(results);
        }
    })
};

const getList = (req, res) => {
    const token = req.decodeToken.userId
    let sql = `SELECT * FROM lists WHERE user_id = ?`;
    conn.query(sql, token, (err, results, field) => {
        if (err) {
            return res.status(400).json({ message: '에러를 처리하는 메세지(리스트 출력 오류)' })
        } else {
            return res.status(200).json(results)
        }
    })
};

const deleteList = (req, res) => {
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
};

const updateList = (req, res) => {
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

}

const checkList = (req, res) => {
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

}
module.exports = {postList, getList, deleteList, updateList, checkList}