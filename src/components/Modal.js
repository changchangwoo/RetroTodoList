export default function Modal(props) {
    return (
        <div className="ModalContainer">
            <div className="ModalLogo fontLarge">
                {props.logo}
            </div>
            {props.children}
        </div>
    )
}