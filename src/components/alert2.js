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
    if (screen.width <= 480) {
      this.handleToggle.bind(this)
    }
    return (
      <div>
        <Modal show={this.state.isModalOpen} onHide={this.handleToggle.bind(this)} >
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
