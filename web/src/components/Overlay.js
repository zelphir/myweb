import React from 'react'
import ReactModal from 'react-modal'
import './Overlay.css'

class Overlay extends React.PureComponent {
  static getDerivedStateFromProps(nextProps) {
    return {
      showModal: nextProps.showModal
    }
  }

  map = React.createRef()

  state = {
    showModal: false
  }

  handleClick = e => {
    const { history, location } = this.props
    e.preventDefault()
    this.setState({ showModal: false })
    setTimeout(() => history.push(location.pathname), 250)
  }

  componentDidMount() {
    const modal = this.map.current.node

    console.log(modal.querySelectorAll('div'))
  }

  render() {
    const { photo } = this.props

    if (!photo) return null

    return (
      <ReactModal
        isOpen={this.state.showModal}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
        ref={this.map}
        overlayClassName="modal-overlay"
      >
        <a href="/photos" onClick={this.handleClick} className="close-modal">
          &times;
        </a>
        <div className="modal-wrapper">
          <div className="details">
            {/*<img src={photo.imageUrl} alt={photo.caption} />*/}
          </div>
          <div className="map">map</div>
        </div>
      </ReactModal>
    )
  }
}

export default Overlay
