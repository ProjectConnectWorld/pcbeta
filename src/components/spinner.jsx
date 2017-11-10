import React, {
  Component,
} from 'react';
import {
  connect
} from 'react-redux';
import './spinner.css';

var Spin = require('react-spinkit');

// Spinner loads when a user clicks on a country 
class Spinner extends Component {

  render() {
    if (this.props.loadingData.load) {
      return (
        <Spin
          name="circle"
          className ="spinner"
          color="#F5A623"
        />
      )

    } else {
      return (
        <div></div>
      )

    }




  }
}





function mapStateToProps(state) {
  return {
    mapData: state.mapData.countryAttributes,
    countrySelected: state.countrySelected,
    loadingData: state.loadingChanged
  }
}



export default connect(mapStateToProps)(Spinner);
