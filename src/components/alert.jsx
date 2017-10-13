import React, {
  Component,
} from 'react';

import {
  Modal
} from 'react-bootstrap';
import './alert.css';



class Alert extends Component {
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



    return (
      <div>
        <Modal show={this.state.isModalOpen} onHide={this.handleToggle.bind(this)} >
          <Modal.Header closeButton>
            <Modal.Title> Project Connect</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Welcome to Project Connect's real-time data visualization! This project is a continuous
            work in progress and the data available does not necessarily represent a complete
            inventory of a country's school locations, additional attributes and level of internet
            connectivity. We are always looking for more partners to validate (and add!) to our existing
            datasets. Please contact
            <a href= "mailto:info@projectconnect.world?Subject=More%20Information">  Project Connect </a>
            to learn more.

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </div>
    )


  }
}






export default Alert;
