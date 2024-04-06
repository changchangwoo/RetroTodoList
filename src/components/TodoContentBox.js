import { useState } from "react";
import deleteImage from "../assets/images/interface-essential-bin.png"

export default function TodoContentBox(props) {
  const [isTodoCheck, setIsTodoCheck] = useState(false)
  const handleUpdate = () => {
    props.handleUpdate();
  }

  const handleCheck = (event) => {
    event.stopPropagation();
    if(isTodoCheck) setIsTodoCheck(false)
    else setIsTodoCheck(true)
  }

  const handleDelete = (event) => {
    event.stopPropagation();
    console.log("delete")
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
