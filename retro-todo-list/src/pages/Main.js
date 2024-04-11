import ModalAdd from "../components/ModalAdd";
import ModalUpdate from "../components/ModalUpdate";
import Button from "../components/Button";
import TodoContentBox from "../components//TodoContentBox";
import { useEffect, useRef, useState } from "react";
import { useCookies } from 'react-cookie';
import API from "../utils/api";

export default function Main() {
  const addRef = useRef(null)
  const updateRef = useRef(null)
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [cookies, setCookies] = useCookies(['id'])
  const [listID, setListID] = useState('')
  const [listArr, setListArr] = useState([])
  const [curText, setCurText] = useState('')

  const formattedTime = currentTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  useEffect(() => {
    API.get('/lists', {
      headers: {
        'Authorization': cookies.id
      }
    }).then(response => {
      setListArr (response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

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

  const tick = () => {
    setCurrentTime(new Date());
  };

  const handlButton = () => {

    setIsModalAdd(true);
  };

  const handleUpdate = (id, context) => {
    setListID(id)
    setCurText(context)
    setIsModalUpdate(true)
  }

  return (
    <>
      <p style={{ color: "white" }}>{isModalAdd}</p>
      {isModalUpdate && <ModalUpdate time={formattedTime} ref={updateRef} id={listID} text={curText} />}
      {isModalAdd && <ModalAdd time={formattedTime} ref={addRef} />}
      <div className="mainContainer" style={{ opacity: (isModalAdd || isModalUpdate) ? 0.4 : 1 }}>
        <div className="modalLogo fontLarge">오늘 할 일!</div>
        <div className="modalSubLogo fontTime">{formattedTime}</div>
        <div className="mainTodoBox">
        <ul>
        {/* 배열의 각 요소에 대해 JSX 요소를 생성 */}
        {listArr.map((item, index) => (
          <li key={index}><TodoContentBox text={item.context} id={item.id} user={item.user_id} state={item.checked}
          handleUpdate={handleUpdate} /></li>
        ))}
      </ul>

        </div>
        <Button value="추가하기" onClick={handlButton} />
      </div>
    </>
  );
}
