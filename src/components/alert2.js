import React, {
  Component,
} from 'react';

import {
  Modal
} from 'react-bootstrap';
import './alert.css';



class Alert2 extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: true
    }
  }


  getInitialState() {
    return {
      isModalOpen: true
    };
  }

  handleToggle() {
    this.setState({
      isModalOpen: false,
    });
  }





  render() {
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

    return (
      <div>
        <Modal show={false} onHide={this.handleToggle.bind(this)} >
          <Modal.Header closeButton>
            <Modal.Title> Project Connect</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The visualization is not optimized for mobile!
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </div>
    )


  }
}






export default Alert2;