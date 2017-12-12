import React, {
  Component
} from 'react'
// import {
//   bindActionCreators
// } from 'redux';
import {
  connect
} from 'react-redux';
import {
  Tooltip,
  OverlayTrigger,
  Button
} from 'react-bootstrap';
import './rightPanel.css'
import VerticalSlider from './verticalSlider';

// This houses the slider that allows the uber to select the connectivity speed threshold
// This happens when over 40% of points have a speed value >= 0
class RightPanel extends Component {

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Move the slider up and down to set an Internet connectivity speed threshold. The schools above the threshold will turn green. Those below it will turn yellow. Those with zero connectivity will remain red.</Tooltip>
    );
    if ((this.props.countrySelected.showSpeed && this.props.countrySelected.country !== 'BR') || (this.props.countrySelected.showSpeed &&  this.props.countrySelected.country === 'BR' && this.props.countrySelected.admin1 != null)) {
      return (
        <div className="right-mod">
          <div className="label">
            Speed (Mbps)
          </div>
          <div className="slidercontainer">
            <OverlayTrigger  placement="left" overlay={tooltip}>
              <Button className="overlay2" bsStyle="default">i</Button>
            </OverlayTrigger>
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
