import Button from "./Button";
import Modal from "./Modal";

export default function ModalAdd() {
  return (
    <>
      <div className="modalBackground">
        <Modal logo="할 일 등록">
          <div className="modalSubLogo fontMedium">2024-04-02 22:06:04</div>
          <form>
            <textarea
              placeholder="할 일을 입력해주세요"
              className="textField fontMedium"
            ></textarea>
            <Button value="등록하기" />
          </form>
        </Modal>
      </div>
    </>
  );
}
