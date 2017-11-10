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
import LoadSpinner from '../actions/loadSpinner';

class VerticalSlider extends Component {

  handleChange = (value) => {
    this.props.loadSpinner(this.props.loadingData.load);
    this.props.sliderChanged(value, this.props.countrySelected.geojson);
    console.log("DONE WITH SLIDER INTERACTION");


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
    sliderData: state.sliderChanged,
    loadingData: state.loadingChanged,
    countrySelected: state.countrySelected,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    sliderChanged: SliderChanged,
    loadSpinner: LoadSpinner
  }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(VerticalSlider);
