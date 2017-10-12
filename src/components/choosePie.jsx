import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import PieExample from './pie';
import PieExample2 from './pie2';


class ChoosePie extends Component {

  render() {
    console.log("cp: " + this.props.countrySelected.showSpeed);
    if (this.props.countrySelected.showSpeed) {
      return (
        <PieExample />
      )

    } else {
      return (
        <PieExample2 />
      )
    }

  }

}

function mapStateToProps(state) {
  return {
    countrySelected: state.countrySelected,
    sliderData: state.sliderChanged,

  }
}


export default connect(mapStateToProps)(ChoosePie);
