import Modal from "../components/Modal"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Register() {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate("/");
    };
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [eqaulCheck, setEqualCheck] = useState(false)

    useEffect(() => {
        const handleEqual = () => {
            if (password.length > 0 && (password === passwordCheck)) {
                setEqualCheck(true);
            } else {
                setEqualCheck(false);
            }
        };
        handleEqual();
    }, [password, passwordCheck, eqaulCheck]); // password와 passwordCheck 상태가 변경될 때마다 handleEqual 호출



    return (
        <>
            <Modal logo="사용자 등록">
                <div style={{ marginTop: '60px' }} />
                <input className="inputBox fontSmall" placeholder="사용자명"></input>
                <div className="registerCheck fontSmall">
                    현재 동일한 이름의 사용자가 있습니다
                </div>
                <input type="password" className="inputBox fontSmall" placeholder="암호" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" className="inputBox fontSmall" placeholder="암호 확인하기" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}></input>

                <div className="registerCheck fontSmall" style={{color: eqaulCheck ? "white" : "red"}}>
                    {eqaulCheck ? `사용 가능한 멋진 암호입니다` : `암호와 암호확인이 일치하지 않습니다`}
                </div>
                <Button value="시작하기" onClick={goToMain}></Button>
            </Modal>
        </>
    )
}