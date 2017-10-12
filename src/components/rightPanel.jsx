import React, {
  Component
} from 'react'
// import {
//   bindActionCreators
// } from 'redux';
import {
  connect
} from 'react-redux';
import './rightPanel.css'
import VerticalSlider from './verticalSlider';

class RightPanel extends Component {

  render() {
    if (this.props.countrySelected.showSpeed) {
      return (
        <div className="right-mod">
          <div className="label">
            Speed (Mbps)
          </div>
          <div className="slidercontainer">

            <div className="slider" >
                <div className="pureslider">
                  <VerticalSlider></VerticalSlider>
                </div>
                <output></output>

              </div>

            </div>
              </div>
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
    mapData: state.mapData,
    countrySelected: state.countrySelected,
  }
}



export default connect(mapStateToProps)(RightPanel);
