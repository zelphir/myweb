import React from 'react'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'
import './Overlay.css'

const Overlay = ({ showModal, photo, location }) => {
  return (
    <ReactModal
      isOpen={showModal}
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <Link to={location}>Close Modal</Link>
      {photo && <img src={photo.imageUrl} alt={photo.caption} />}
    </ReactModal>
  )
}

export default Overlay
