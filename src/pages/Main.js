import ModalAdd from "../components/ModalAdd";
import Button from "../components/Button";
import TodoContentBox from "../components//TodoContentBox";
import { useEffect, useRef, useState } from "react";

export default function Main() {
  const [isModal, setIsModal] = useState(false);
  const handlButton = () => {
    setIsModal(true);
  };

  return (
    <>
      {isModal && <ModalAdd />}
      <div className="mainContainer" style={{ opacity: isModal ? 0.5 : 1 }}>
        <div className="modalLogo fontLarge">오늘 할 일!</div>
        <div className="modalSubLogo fontTime">2024-04-02 19:29:03</div>
        <div className="mainTodoBox">
          <TodoContentBox text="인강보는척 하면서 몰래 유튜브 보기" />
        </div>
        <Button value="추가하기" onClick={handlButton} />
      </div>
    </>
  );
}
