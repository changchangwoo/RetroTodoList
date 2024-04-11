import Modal from "../components/Modal"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";


export default function Register() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('')
    const [userPW, setuserPW] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [eqaulCheck, setEqualCheck] = useState(false)
    const [idCheck, setidCheck] = useState(false)

    useEffect(() => {
        const handleEqual = () => {
            if (userPW.length > 0 && (userPW === passwordCheck)) {
                setEqualCheck(true);
            } else {
                setEqualCheck(false);
            }
        };
        handleEqual();
    }, [userPW, passwordCheck, eqaulCheck]);

    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const checkDuplicate = async (value) => {
        API.post('/users/check', {
            userId : value
        }).then(response => {
            if(response.data === "성공") setidCheck(true)
        }).catch(err => {
            setidCheck(false)
        })
        };


    const debounceCheckDuplicate = debounce(checkDuplicate, 200);

    const handleJoin = () => {
        API.post('/users/join', {
            userId: userId,
            userPW: userPW
        }).then(response => {
            console.log(response)
            if (response.status === 201) navigate("/");
            else console.log('회원가입 실패')
        }).catch(error => {
            console.log(error)
        });
    };


    return (
        <>
            <Modal logo="사용자 등록">
                <div style={{ marginTop: '60px' }} />
                <input className="inputBox fontSmall" placeholder="사용자명" value={userId} onChange={(e) => {
                    setUserId(e.target.value)
                    debounceCheckDuplicate(e.target.value)
                }}></input>
                <div className="registerCheck fontSmall" style={{ color: idCheck ? "white" : "red" }}>
                    {idCheck ? `사용 가능한 좋은 아이디입니다` : `이미 사용중인 아이디입니다`}
                </div>
                <input type="password" className="inputBox fontSmall" placeholder="암호" value={userPW} onChange={(e) => setuserPW(e.target.value)}></input>
                <input type="password" className="inputBox fontSmall" placeholder="암호 확인하기" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}></input>

                <div className="registerCheck fontSmall" style={{ color: eqaulCheck ? "white" : "red" }}>
                    {eqaulCheck ? `사용 가능한 멋진 암호입니다` : `암호와 암호확인이 일치하지 않습니다`}
                </div>
                <Button value="시작하기" onClick={handleJoin}></Button>
            </Modal>
        </>
    )
}