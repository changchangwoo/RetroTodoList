const express = require("express")
const router = express.Router()
const { body, param, validationResult, check } = require("express-validator")
router.use(express.json())
const decodeToken = require("../utils/jwt.js");
const { postList, getList, deleteList, updateList, checkList } = require("../controller/ListController.js")


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
        validate,
        decodeToken],
    postList
)

// 리스트 출력
router.get("/", decodeToken, getList)

// 리스트 개별 삭제
router.delete("/:id",
    [param("id").notEmpty().isString().withMessage("쿼리스트링 비어있음"),
        validate], deleteList)

// 리스트 개별 수정
router.put("/:id/update",
    [param("id").notEmpty().withMessage("쿼리스트링 비어있음"),
    body("context").notEmpty().isString().withMessage("내용이 비어있음")],
    validate, updateList)

// 리스트 개별 체크확인
router.put("/:id", [
    param("id").notEmpty().withMessage("쿼리스트링 비어있음"),
    body("state").notEmpty().withMessage("상태체크 비어있음")

    , validate], checkList)
module.exports = router