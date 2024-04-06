export default function Button(props) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <>
      <div onClick={handleClick} className="buttonContainer btn">
        {props.value}
      </div>
    </>
  );
}
