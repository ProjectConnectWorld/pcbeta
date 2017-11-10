import React, {
  Component,
} from 'react';

import {
  Navbar,
} from 'react-bootstrap';
import './nav.css';
import logo from '../data/pc.png'
import logo2 from '../data/unicef.png'




// Navbar
class Naver extends Component {

  render() {

    return (
      <Navbar>
        <Navbar.Brand pullLeft>
          <a href="http://projectconnect.world"><img src={logo} height= "100%" alt=""/></a>
        </Navbar.Brand>
        <Navbar.Brand pullRight className="nav2">
          <a href="#"><img src={logo2} height= "100%" alt=""/></a>
        </Navbar.Brand>


      </Navbar>
    )
  }
}


export default Naver;
