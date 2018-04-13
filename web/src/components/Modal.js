import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ showModal, children }) => (
  <ReactModal
    isOpen={showModal}
    ariaHideApp={false}
    closeTimeoutMS={200}
    className="modal"
    overlayClassName="modal-overlay"
  >
    {children}
  </ReactModal>
)

export default Modal
