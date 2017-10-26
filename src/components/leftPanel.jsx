import React, {
  Component
} from 'react'
// import {
//   bindActionCreators
// } from 'redux';
import {
  connect
} from 'react-redux';
import './leftPanel.css'
import ChoosePie from './choosePie';
import {
  Tooltip,
  OverlayTrigger,
  Button
} from 'react-bootstrap';


class LeftPanel extends Component {



  render() {
    var fullname = "";
    if (this.props.countrySelected.adminName != null) {

      if (this.props.countrySelected.adminName.length > 1) {
        fullname = this.props.countrySelected.adminName + ", "
      }

    }
    var tooltip;
    if (this.props.countrySelected.adminName != null) {
      if (this.props.countrySelected.adminName.length > 1) {
        var tooltip = (
          <Tooltip id="tooltip">This shows the percentage of schools connected to the Internet for the selected region. To compare between specific connectivity levels click on the boxes below and hover over the pie chart to see the number of schools.</Tooltip>
        );
      } else {
        var tooltip = (
          <Tooltip id="tooltip">This shows the percentage of schools connected to the Internet for the entire country. To compare between specific connectivity levels click on the boxes below and hover over the pie chart to see the number of schools.</Tooltip>
        );
      }

    } else {
      var tooltip = (
        <Tooltip id="tooltip">This shows the percentage of schools connected to the Internet for the entire country. To compare between specific connectivity levels click on the boxes below and hover over the pie chart to see the number of schools.</Tooltip>
      );
    }




    return (
      <div className="left-mod">
        <div className="label">
          {fullname} {this.props.countrySelected.countryname} Attributes
        </div>
        <div className="dynamic">
          <div className="content">
            {/* <!-- Schools --> */}
            <div className="schools eld">
              <p className="contentval" id="nschools">{this.props.countrySelected.schoolcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p className="contentlabel">SCHOOLS</p>
            </div>
            {/* <!-- Connected Schools --> */}
            <div className="schools eld">
              <p className="contentval" id="cschools">{this.props.countrySelected.totalconnectedschools.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p className="contentlabel">CONNECTED_SCHOOLS</p>
            </div>
            {/* <!-- Students --> */}
            <div className="students eld">
              <p className="contentval" id="nstudents">{this.props.countrySelected.totalstudents.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p className="contentlabel">STUDENTS</p>
            </div>
            {/* <!-- Teachers --> */}
            <div className="teachers eld">
              <p className="contentval" id="nteachers">{this.props.countrySelected.totalteachers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p className="contentlabel">TEACHERS</p>
            </div>
            {/* <!-- connSchools --> */}
            <div className="classNamerooms eld">
              <p className="contentval" id="nclassNamerooms">{this.props.countrySelected.totalelec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p className="contentlabel">SCHOOLS_WITH_ELECTRICITY</p>
            </div>
            {/* <!-- avgMbps --> */}
            <div className="classNamerooms eld">
              <p className="contentval" id="nclassNamerooms">{this.props.countrySelected.avgspeed}</p>
              <p className="contentlabel">AVERAGE_MBPS</p>
            </div>

          </div>
        </div>

        {/* <!-- Pie Chart Left Mod Section --> */}
        <div className="label">
          Connectivity
        </div>
        <div className="piechart  " id="piechart">
          <OverlayTrigger  placement="right" overlay={tooltip}>
            <Button className="overlay1" bsStyle="default">i</Button>
          </OverlayTrigger>
          <div className="piecontainer">
            <ChoosePie  />
          </div>
        </div>
        <div className="questions">
          Questions <Button bsStyle="default" className="qbutton">?</Button>
        </div>


      </div>
    )


  }
}


function mapStateToProps(state) {
  return {
    mapData: state.mapData.countryAttributes,
    countrySelected: state.countrySelected,
  }
}



export default connect(mapStateToProps)(LeftPanel);
