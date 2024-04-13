const express = require("express")
const router = express.Router()
const {check, join, login} = require("../controller/UserController")
router.use(express.json())

// 로그인/비밀번호 확인
router.post("/check",check)

// 회원가입
router.post("/join",join)

//로그인
router.post("/login",login)

module.exports = router