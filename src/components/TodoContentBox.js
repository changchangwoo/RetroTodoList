export default function TodoContentBox(props) {
  return (
    <>
      <div className="todoContentBox">
        <div className="todoText fontMedium">* {props.text}</div>
        <div className="todoDate"></div>
        <div className="todoCheckButton"></div>
        <div className="todoDeleteButton"></div>
      </div>
    </>
  );
}
