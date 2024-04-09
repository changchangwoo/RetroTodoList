import { forwardRef } from "react";
import Button from "./Button";
import Modal from "./Modal";

const ModalUpdate = forwardRef((props, ref) => {
  const handleUpdate = () => {
    console.log("update")
  }
  return (
    <>
      <div className="modalBackground" ref={ref}>
        <Modal logo="할 일 수정">
          <div className="modalSubLogo fontMedium">{props.time}</div>
          <form>
            <textarea
              placeholder="할 일을 수정해주세요"
              className="textField fontMedium"
            ></textarea>
            <Button value="수정하기" onClick={handleUpdate} />
          </form>
        </Modal>
      </div>
    </>
  );  
})

export default ModalUpdate
