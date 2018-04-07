import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import './Overlay.scss'

const Overlay = ({ showModal, handleModal }) => {
  return (
    <ReactModal
      isOpen={showModal}
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button onClick={handleModal}>Close Modal</button>
    </ReactModal>
  )
}

Overlay.propTypes = {
  picture: PropTypes.object,
  showModal: PropTypes.bool,
  handleModal: PropTypes.func
}

export default Overlay
