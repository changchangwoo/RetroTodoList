import { forwardRef } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";
import API from "../utils/api";



const ModalUpdate = forwardRef((props, ref) => {
  const [textField, setTextFiled] = useState('')
  const handleUpdate = () => {
    let URL = '/lists/'+props.id+'/update'
    API.put(URL,{context : textField}).then(response => {
      window.location.reload();
    }).then(error => {
      console.log(error)
    })
    }

  return (
    <>
      <div className="modalBackground" ref={ref}>
        <Modal logo="할 일 수정">
          <div className="modalSubLogo fontMedium">{props.time}</div>
          <form>
            <textarea
              placeholder={props.text}
              className="textField fontMedium"
              value={textField}
              onChange={(e) => setTextFiled(e.target.value)}
            ></textarea>
            <Button value="수정하기" onClick={handleUpdate} />
          </form>
        </Modal>
      </div>
    </>
  );
})

export default ModalUpdate
