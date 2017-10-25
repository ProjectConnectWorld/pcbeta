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
            <Modal.Title> Project Connect   |   Alpha Version </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Welcome to Project Connect's real-time data visualization! This project is in its <strong> alpha version </strong> and is a continuous work in
              progress. The data available does not necessarily represent a complete inventory of a country's school locations and level
              of Internet connectivity. <strong> We are always looking for more partners </strong> to validate (and add!) to our existing datasets. Please
              contact <a href= "mailto:info@projectconnect.world?Subject=More%20Information">  Project Connect </a> to learn more.
            </p>
            <p>
              <h4>Navigating this map</h4>
              This map brings together a wide range of data, including school location and other key attributes as well as information
              on school Internet connectivity, both in terms of speed (Mbs) and type (2G and 3G). Click on a country to see what
              information is currently available and on individual dots to find out more details for a particular school.
            </p>
            <p><strong>Yellow </strong>
            countries indicate that we have both school location and Internet connectivity data.</p>
            <p><strong>Light gray</strong> indicates that we
            only have school location information.</p>
            <p><strong>*NOTE*</strong> Data had not been independently verifies</p>


          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </div>
    )


  }
}






export default Alert;
