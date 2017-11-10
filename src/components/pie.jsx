import React, {
  Component
} from 'react';
import {
  Pie
} from 'react-chartjs-2';
import {
  connect
} from 'react-redux';

// PieExample is displayed when connectivity_type data is not present
class PieExample extends Component {

  isArray = Array.isArray ?
    function(obj) {
      return Array.isArray(obj);
    } :
    function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

  getValueAtIndexOrDefault = (value, index, defaultValue) => {
    if (value === undefined || value === null) {
      return defaultValue;
    }

    if (this.isArray(value)) {
      return index < value.length ? value[index] : defaultValue;
    }

    return value;
  };


  render() {



    const data = {
      labels: [
        'Zero Connectivity',
        'Above Threshold',
        'Below Threshold',
        'No Connetivity Data'
      ],
      datasets: [{
        data: [this.props.sliderData.noConn, this.props.sliderData.aboveConn, this.props.sliderData.belowConn, this.props.sliderData.noData],
        backgroundColor: [
          '#d9534f',
          '#5cb85c',
          '#F5A623',
          '#DCDCDC'
        ],
        hoverBackgroundColor: [
          '#d9534f',
          '#5cb85c',
          '#F5A623',
          '#DCDCDC'
        ]
      }]
    }

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {

            chart.legend.afterFit = function() {
              var width = this.width;
              //console.log(this);

              this.lineWidths = this.lineWidths.map(() => this.width - 12);

              this.options.labels.padding = 10;
              this.options.labels.boxWidth = 15;

            };

            var data = chart.data;
            //https://github.com/chartjs/Chart.js/blob/1ef9fbf7a65763c13fa4bdf42bf4c68da852b1db/src/controllers/controller.doughnut.js
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                var meta = chart.getDatasetMeta(0);
                var ds = data.datasets[0];
                var arc = meta.data[i];
                var custom = arc && arc.custom || {};
                var getValueAtIndexOrDefault = this.getValueAtIndexOrDefault;
                var arcOpts = chart.options.elements.arc;
                var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                return {
                  text: label,
                  fillStyle: fill,
                  strokeStyle: stroke,
                  lineWidth: bw,
                  hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

                  // Extra data used for toggling the correct item
                  index: i
                };
              });
            }
            return [];
          }

        }
      }
    }

    return (
      <Pie data={data} options={options}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    countrySelected: state.countrySelected,
    sliderData: state.sliderChanged,

  }
}


export default connect(mapStateToProps)(PieExample);
