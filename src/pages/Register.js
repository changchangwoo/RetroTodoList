import Modal from "../components/Modal"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";


export default function Register() {
    const navigate = useNavigate();
    const goToMain = () => {
      navigate("/");
    };
    return (
        <>
            <Modal logo="사용자 등록">
                <div style={{ marginTop: '60px' }} />
                <input className="inputBox fontSmall" placeholder="사용자명"></input>
                <div className="registerCheck fontSmall">
                    현재 동일한 이름의 사용자가 있습니다
                </div>
                <input className="inputBox fontSmall" placeholder="암호"></input>
                <input className="inputBox fontSmall" placeholder="암호 확인하기"></input>

                <div className="registerCheck fontSmall">
                    사용 가능한 멋진 암호입니다
                </div>
                <Button value="시작하기" onClick={goToMain}></Button>
            </Modal>
        </>
    )
}