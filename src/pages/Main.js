import ModalAdd from "../components/ModalAdd";
import ModalUpdate from "../components/ModalUpdate";

import Button from "../components/Button";
import TodoContentBox from "../components//TodoContentBox";
import { useEffect, useRef, useState } from "react";

export default function Main() {
  const addRef = useRef(null)
  const updateRef = useRef(null)
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  const formattedTime = currentTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setCurrentTime(new Date());
  };

  const handlButton = () => {
    setIsModalAdd(true);
  };

  const handleUpdate = () => {
    setIsModalUpdate(true)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isModalAdd && !addRef.current.contains(e.target)) setIsModalAdd(false)
      if (isModalUpdate && !updateRef.current.contains(e.target)) setIsModalUpdate(false)
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalAdd, isModalUpdate]);


  return (
    <>
      <p style={{ color: "white" }}>{isModalAdd}</p>
      {isModalUpdate && <ModalUpdate time={formattedTime} ref={updateRef} />}
      {isModalAdd && <ModalAdd time={formattedTime} ref={addRef} />}
      <div className="mainContainer" style={{ opacity: (isModalAdd || isModalUpdate) ? 0.4 : 1 }}>
        <div className="modalLogo fontLarge">오늘 할 일!</div>
        <div className="modalSubLogo fontTime">{formattedTime}</div>
        <div className="mainTodoBox">
          <TodoContentBox text="인강보는척 하면서 몰래 유튜브 보기"
            handleUpdate={handleUpdate} />
        </div>
        <Button value="추가하기" onClick={handlButton} />
      </div>
    </>
  );
}
