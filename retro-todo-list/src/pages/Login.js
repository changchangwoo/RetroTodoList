import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"
import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/Register");
  };
  const [userId, setUserId] = useState('')
  const [userPW, setUserPW] = useState('')
  const [failCheck, setFailCheck] = useState(false)
  const [cookie, setCookie] = useCookies(['id']);

  const handleLogin = (event) => {
    if(event.key === 'Enter') {
      API.post('/users/login', {
        userId: userId,
        userPW: userPW
      }).then(response => {
        if(response.status === 200) {
          setCookie('id', response.data.token)
          navigate("/Main")
        }
      }).catch(error => {
        setFailCheck(true)
      });
    }
  }

  return (
    <>
      <Modal logo="할 일 목록">
        <div className="modalSubLogo fontMedium">
          오늘 할 일을 내일로 미루지 말자
        </div>
        <div className="loginImageBox"></div>
        <input className="inputBox fontSmall" placeholder="사용자명" value={userId} onChange={(e) => setUserId(e.target.value)} onKeyDown={handleLogin}></input>
        <input type="password" className="inputBox fontSmall" placeholder="암호" value={userPW} onChange={(e)=> setUserPW(e.target.value)} onKeyDown={handleLogin}></input>
        <div className="loginRegisterLink">
        {failCheck && <div className="fontSmall" style={{marginBottom: "20px", color: "red"}}>계정 식별 불가</div>}
          <span onClick={goToRegister}>새로 등록하기</span>
        </div>
      </Modal>
    </>
  );
}
