import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ children }) => (
  <ReactModal
    isOpen
    ariaHideApp={false}
    closeTimeoutMS={200}
    className="modal"
    overlayClassName="modal-overlay"
  >
    {children}
  </ReactModal>
)

export default Modal
