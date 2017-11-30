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
  Button,
  Modal
} from 'react-bootstrap';

// The left panel houses the Country Connectivity data, the pie chart, and the question button
class LeftPanel extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: true
    }
  }

  handleToggle() {
    this.setState({
      isModalOpen: false,
    });
  }
  handleToggle2() {
    this.setState({
      isModalOpen: true,
    });
  }


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
          <Button bsStyle="default" className="qbutton" onClick={this.handleToggle2.bind(this)} >?</Button>
          <Modal show={this.state.isModalOpen} onHide={this.handleToggle.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title> Project Connect   |   Alpha Version </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Welcome to Project Connect's real-time data visualization! This project is in its <strong> alpha version </strong> and is a continuous work in
                progress. The data available does not necessarily represent a complete inventory of a country's school locations and level
                of Internet connectivity. <strong> We are always looking for more partners </strong> to validate (and add!) to our existing datasets. Please
                contact <a href= "mailto:info@projectconnect.world?Subject=More%20Information">  Project Connect </a> to learn more.
              </p>
              <p>
                <h4>Navigating this map:</h4>
                This map brings together a wide range of data, including school location and other key attributes as well as information
                on school Internet connectivity, both in terms of speed (Mbs) and type (2G and 3G). Click on a country to see what
                information is currently available and on individual dots to find out more details for a particular school.
              </p>

              <p><span>&#8226;</span><strong>Dark yellow </strong>
              countries indicate that we have both school location and Internet connectivity data.</p>
              <p><span>&#8226;</span><strong>Light yellow </strong> countries indicates that we
              only have school location information.</p>
              <h4>Note:</h4>
              <p> Not all data has been independently verified. We also only have partial data for some countries and are looking for your help to continue filling out this map.</p>

            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="warning" onClick={this.handleToggle.bind(this)}>Accept</Button>
            </Modal.Footer>

          </Modal>
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
