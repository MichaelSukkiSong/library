import "./Modal.scss";
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={() => onClose()}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
        <button className="modal__confirm-btn" onClick={onConfirm}>
          Confirm
        </button>
        <button className="modal__cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Modal;
