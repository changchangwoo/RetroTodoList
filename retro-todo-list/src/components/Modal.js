export default function Modal(props) {
  return (
    <div className="modalContainer">
      <div className="modalLogo fontLarge">{props.logo}</div>
      {props.children}
    </div>
  );
}
