import Button from "./Button";
import Modal from "./Modal";

export default function ModalUpdate(props) {
  return (
    <>
      <div className="modalBackground">
        <Modal logo="할 일 수정">
          <div className="modalSubLogo fontMedium">{props.time}</div>
          <form>
            <textarea
              placeholder="할 일을 수정해주세요"
              className="textField fontMedium"
            ></textarea>
            <Button value="수정하기" />
          </form>
        </Modal>
      </div>
    </>
  );
}
