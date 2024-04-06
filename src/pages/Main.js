import ModalAdd from "../components/ModalAdd";
import ModalUpdate from "../components/ModalUpdate";

import Button from "../components/Button";
import TodoContentBox from "../components//TodoContentBox";
import {useEffect, useState } from "react";

export default function Main() {
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [istModalUpdate, setIsModalUpdate] = useState(false)
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
  

  return (
    <>
      {istModalUpdate && <ModalUpdate time={formattedTime}/>}
      {isModalAdd && <ModalAdd time={formattedTime} />}
      <div className="mainContainer" style={{ opacity: (isModalAdd||istModalUpdate) ? 0.4 : 1 }}>
        <div className="modalLogo fontLarge">오늘 할 일!</div>
        <div className="modalSubLogo fontTime">{formattedTime}</div>
        <div className="mainTodoBox">
          <TodoContentBox text="인강보는척 하면서 몰래 유튜브 보기"
          handleUpdate={handleUpdate}/>
        </div>
        <Button value="추가하기" onClick={handlButton} />
      </div>
    </>
  );
}
