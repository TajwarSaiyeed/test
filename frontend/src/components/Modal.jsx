function Modal(props) {
    return (    
        <div className="modal-overlay" onClick={props.onClickOutside}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>{props.children}</div>
        </div>
    )
}

export default Modal