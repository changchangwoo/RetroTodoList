import { useRef, forwardRef } from "react";
import Button from "./Button";
import Modal from "./Modal";

const ModalAdd = forwardRef((props, ref) => {
  const handleAdd = () => {
    console.log("add")
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
            ></textarea>
            <Button value="등록하기" onClick={handleAdd}/>
          </form>
        </Modal>
      </div>
    </>
  );
})

export default ModalAdd