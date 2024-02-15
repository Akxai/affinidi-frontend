import React from "react";
import "./Modal.css";

const ModalW = ({ closeModal, message }) => {
  return (
    <div className="ModalOverlay">
      <div className="Modal">
        <p>{message}</p>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};

export default ModalW;
