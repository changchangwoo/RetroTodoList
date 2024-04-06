export default function Button(props) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <>
      <div onClick={handleClick} className="buttonContainer">
        {props.value}
      </div>
    </>
  );
}
