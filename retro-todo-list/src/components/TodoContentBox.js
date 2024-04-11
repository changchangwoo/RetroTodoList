import { useEffect, useState } from "react";
import deleteImage from "../assets/images/interface-essential-bin.png"
import API from "../utils/api";

export default function TodoContentBox(props) {
  const [isTodoCheck, setIsTodoCheck] = useState(false)
  const handleUpdate = () => {
    props.handleUpdate(props.id, props.text);
  }

  useEffect(() => {
    if(props.state === 1) setIsTodoCheck(true) 
  }, [])

  const handleCheck = (event) => {
    event.stopPropagation();
    let URL = '/lists/'+props.id
    API.put(URL, {
      state : props.state
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })

    if(isTodoCheck) setIsTodoCheck(false)
    else setIsTodoCheck(true)
  }

  const handleDelete = (event) => {
    event.stopPropagation();
    let URL = '/lists/'+props.id
    API.delete(URL).then(response => {
      window.location.reload();
    }).then(error => {
      console.log(error)
    })
  }
  return (
    <>
      <div className="todoContentBox" onClick={handleUpdate}
      style={{backgroundColor : isTodoCheck ? "grey" : "black"}}>
        <div className="todoText fontMedium"> * {props.text}</div>
        <div className="todoDate">2024. 04. 06</div>
        <div className="todoCheckButton btn"
        onClick={handleCheck}></div>
        <div className="todoDeleteButton btn" onClick={handleDelete}>
          <img src={deleteImage}></img>
          </div>
      </div>
    </>
  );
}
