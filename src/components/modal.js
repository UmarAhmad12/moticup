// Modal.js
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <button onClick={onClose} className="mb-2"><CloseIcon /></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
