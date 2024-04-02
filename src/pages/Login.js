import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const goToRegister = () => {
        navigate("/Register")
    }
    return (
        <>
            <Modal logo="할 일 목록">
                <div className="ModalSubLogo fontMedium">
                    오늘 할 일을 내일로 미루지 말자
                </div>
                <div className="LoginImageBox">

                </div>
                <input className="inputBox fontSmall" placeholder="사용자명"></input>
                <input className="inputBox fontSmall" placeholder="암호"></input>
                <div className="LoginRegisterLink">
                    <span onClick={goToRegister}>새로 등록하기</span>
                </div>
            </Modal>
        </>
    )
}