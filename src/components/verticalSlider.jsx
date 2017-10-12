import React, {
  Component
} from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';


import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'

import SliderChanged from '../actions/sliderChanged';

class VerticalSlider extends Component {

  handleChange = (value) => {
    console.log("T");
    console.log(this.props.countrySelected.geojson);
    this.props.sliderChanged(value, this.props.countrySelected.geojson);

  }




  render() {
    const {
      value
    } = this.props.sliderData.value;
    const verticalLabels = {
      0: '0',
      2: '2',
      4: '4',
      6: '6',
      8: '8'
    }

    return (
      <div className='slider orientation-reversed'>
        <Slider
          min={0}
          max={8}
          step={1}
          value={this.props.sliderData.value}
          orientation='vertical'
          onChange={this.handleChange}
          labels={verticalLabels}
        />
        <div className='value'>{value} mbps</div>

      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    countrySelected: state.countrySelected,
    sliderData: state.sliderChanged,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    sliderChanged: SliderChanged
  }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(VerticalSlider);
