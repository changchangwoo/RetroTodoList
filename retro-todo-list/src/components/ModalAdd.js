import { useRef, forwardRef, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useCookies } from 'react-cookie';
import API from "../utils/api";
import { useNavigate } from "react-router-dom";


const ModalAdd = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const [textField, setTextFiled] = useState('')
  const [cookies, setCookies] = useCookies(['id'])

  const handleAdd = () => {
    API.post('/lists', {
      context : textField,
      token : cookies.id
    }).then(response => {
      window.location.reload();
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <>
      <div className="modalBackground" ref={ref}>
        <Modal logo="할 일 등록">
          <div className="modalSubLogo fontMedium">{props.time}</div>
          <form>
            <textarea
              placeholder="할 일을 입력해주세요"  
              className="textField fontMedium"
              value={textField}
              onChange={(e)=>setTextFiled(e.target.value)}
            ></textarea>
            <Button value="등록하기" onClick={handleAdd}/>
          </form>
        </Modal>
      </div>
    </>
  );
})

export default ModalAdd