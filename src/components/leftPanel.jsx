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


class LeftPanel extends Component {
  getInitialState() {
      return {
        showModal: false
      };
    },

    close() {
      this.setState({
        showModal: false
      });
    },

    open() {
      this.setState({
        showModal: true
      });
    },

    render() {
      // getInitialState = () => {
      //     return {
      //       showModal: false
      //     };
      //   },
      //
      //   close = () => {
      //     this.setState({
      //       showModal: false
      //     });
      //   },
      //
      //   open = () => {
      //     this.setState({
      //       showModal: true
      //     });
      //   }
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
          <Button bsStyle="default" className="qbutton" onClick={this.open} >?</Button>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

              <hr />

              <h4>Overflowing text to show scroll behavior</h4>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
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
