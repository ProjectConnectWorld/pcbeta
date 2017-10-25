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

class RightPanel extends Component {

  render() {
    const tooltip = (
      <Tooltip id="tooltip">BLAH</Tooltip>
    );
    if (this.props.countrySelected.showSpeed && this.props.countrySelected.country === 'BR' && this.props.countrySelected.admin1 != null) {
      return (
        <div className="right-mod">
          <div className="label">
            Speed (Mbps)
          </div>
          <div className="slidercontainer">
            <OverlayTrigger  placement="left" overlay={tooltip}>
              <Button className="overlay1" bsStyle="default">i</Button>
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
