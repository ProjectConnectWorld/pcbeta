import React, {
  Component,
} from 'react';
import {
  Modal
} from 'react-bootstrap';
import './alert.css';


// Creates the Alert message that pop ups at the initial loading
// and when the user presses the questions button
class Alert extends Component {
  constructor() {
    super();
    var isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };

    console.log(isMobile.any());

    this.state = {
      isModalOpen: isMobile.any()
    }
  }


  handleToggle() {
    this.setState({
      isModalOpen: false,
    });
  }


  render() {
    return (
      <div>
        <Modal show={this.state.isModalOpen} onHide={this.handleToggle.bind(this)} >
          <Modal.Header closeButton>
            <Modal.Title> Project Connect</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This visualization is not optimized for mobile!
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </div>
    )


  }
}


export default Alert;
