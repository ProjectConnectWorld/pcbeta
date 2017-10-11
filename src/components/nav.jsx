import React, {
  Component,
} from 'react';

import {
  Navbar,
} from 'react-bootstrap';
import './nav.css';
import logo from '../data/pc.png'
import logo2 from '../data/unicef.png'





class Naver extends Component {



  render() {



    return (
      <Navbar>
        <Navbar.Brand pullLeft>
          <a href="#"><img src={logo} height= "110%" alt=""/></a>
        </Navbar.Brand>
        <Navbar.Brand pullRight className="nav2">
          <a href="#"><img src={logo2} height= "110%" alt=""/></a>
        </Navbar.Brand>


      </Navbar>
    )
  }
}


export default Naver;
