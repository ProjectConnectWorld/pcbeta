import React, {
  Component
} from 'react'
import {
  ZoomControl,
  Map,
  TileLayer,
  GeoJSON,
  LayersControl,
  ImageOverlay,
} from 'react-leaflet'
// import HeatmapLayer from 'react-leaflet-heatmap-layer'
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'
import GeoJsonV from '../data/countrygeo.js'
import BrazilGeo from '../data/brazilGeo.js'
import {
  alpha3ToAlpha2
} from 'i18n-iso-countries';
import {
  ClickedCountry
} from '../actions/clickedCountry';
// import {
//   ClickedCountry2
// } from '../actions/clickedCountry2';
import SliderChanged from '../actions/sliderChanged';
import LoadSpinner from '../actions/loadSpinner';
import L from 'leaflet';
import popUpString from './helperComponent';
import allCountries from '../data/allCountryInfo.js';
//import MarkerClusterGroup from 'react-leaflet-markercluster';
//import ClusterLayer from 'react-leaflet-cluster-layer';
// import {
//   GeoJsonCluster
// } from 'react-geojson-cluster';

var _ = require('lodash');
var toLoad = false;
var toLoadCount = 0;

class SimpleExample extends Component {



  centerCountry = (latlng, lev) => {
    this.refs.map.leafletElement.flyTo(latlng, lev);
  }



  getStyle = (value, type) => {
    //console.log(type);
    if (this.props.countrySelected.showSpeed) {
      if (value === null) {
        return "#DCDCDC";
      } else if (value === 0) {
        return "#d9534f";
      } else if (value >= this.props.sliderData.value) {
        return "#5cb85c";
      } else if (value < this.props.sliderData.value) {
        return "#F5A623";
      }
    } else {
      //console.log("GGGS");
      if (type === null) {
        return "#DCDCDC";
      } else if (type === "No Service") {
        return "#d9534f";
      } else if (type === "3G") {
        return "#5cb85c";
      } else if (type === "2G") {
        return "#F5A623";
      }


    }

  }


  styleMe = (geoJsonFeature) => {
    //var layer = e.target;
    const style = {
      fill: true,
      fillColor: "#DCDCDC",
      fillOpacity: .2,
      stroke: false,
    }
    const style1 = {
      fill: true,
      fillColor: "#DCDCDC",
      fillOpacity: 0,
      stroke: false,
    }
    const style2 = {
      fill: true,
      fillColor: "#F5A623",
      fillOpacity: .7,
      stroke: false,
    }
    var alpha2 = alpha3ToAlpha2(geoJsonFeature.id);
    if (allCountries.indexOf(alpha2) > -1) {
      if (alpha2 === "MR" || alpha2 === "BR") {
        return style2;
      } else {
        return style;
      }

    } else {
      return style1;
    }
  }

  styleMe2 = (geoJsonFeature) => {
    //var layer = e.target;
    const style = {
      fill: true,
      fillColor: "#F5A623",
      fillOpacity: .7,
      stroke: false,
    }

    return style;

  }


  geoFilter = (feature) => {
    var alpha2 = alpha3ToAlpha2(feature.id);
    if (alpha2 === 'BR') {
      return false;
    }
    return true;
  }

  // geoFilter2 = (feature) => {
  //   if (feature.properties.UF === this.props.countrySelected.admin1) {
  //     return false;
  //   }
  //   return true;
  // }



  onEachFeature = (feature, layer) => {
    layer.on({
      'mouseover': (e) => {
        var alpha2 = alpha3ToAlpha2(feature.id);
        if (this.props.countrySelected.country !== alpha2 && (allCountries.indexOf(alpha2) > -1)) {
          layer.setStyle({
            fillColor: "#F5A623",
            fillOpacity: 0.7
          });

        }
        if (this.props.countrySelected.country === alpha2) {
          layer.setStyle({
            fillOpacity: 0
          });

        }

      },
      'mouseout': (e) => {
        var alpha2 = alpha3ToAlpha2(feature.id);
        if ((allCountries.indexOf(alpha2) > -1)) {
          layer.setStyle({
            fillColor: "#DCDCDC",
            fillOpacity: .2
          })
        }
        if (this.props.countrySelected.country === alpha2) {
          layer.setStyle({
            fillOpacity: 0
          });

        }
      },
      'click': (e) => {
        console.log(e.latlng);
        var alpha2 = alpha3ToAlpha2(e.target.feature.id);
        if ((allCountries.indexOf(alpha2) > -1) && alpha2 !== this.props.countrySelected.country) {
          console.log("Calling: " + alpha2);
          this.props.loadSpinner(true);
          this.centerCountry(e.latlng, 5);
          this.props.clickedCountry(alpha2, this.props.sliderData.value, null);
          toLoad = true;
          //this.props.sliderChanged(this.props.sliderData.value, this.props.countrySelected.geojson);

        }

        console.log(e);
      }
    });
  }


  onEachFeature2 = (feature, layer) => {
    layer.on({
      'mouseover': (e) => {
        layer.setStyle({
          fillColor: "#F5A623",
          fillOpacity: 0.7
        });
        if (this.props.countrySelected.admin1 === feature.properties.UF) {
          layer.setStyle({
            fillOpacity: 0
          });

        }

      },
      'mouseout': (e) => {
        layer.setStyle({
          fillColor: "#DCDCDC",
          fillOpacity: .2
        })
        if (this.props.countrySelected.admin1 === feature.properties.UF) {
          layer.setStyle({
            fillOpacity: 0
          });
        }

      },
      'click': (e) => {
        console.log(e);
        if (this.props.countrySelected.admin1 !== feature.properties.UF) {
          var admin1 = e.target.feature.properties.UF;
          console.log(admin1);
          var alpha2 = 'BR'
          console.log("Calling: " + alpha2);
          this.props.loadSpinner(true);
          this.centerCountry(e.latlng, 6);
          this.props.clickedCountry(alpha2, this.props.sliderData.value, admin1);
          toLoad = true;
        }



        console.log(e);
      }
    });
  }









  pointToLayer = (feature, latlng) => {
    // console.log(feature.properties);
    return L.circleMarker(latlng, {
      color: this.getStyle(feature.properties.speed_connectivity, feature.properties.type_connectivity),
      fillColor: this.getStyle(feature.properties.speed_connectivity),
      fillOpacity: .6,
      radius: 1
    }).bindPopup(popUpString(feature.properties)); // Change marker to circle
  }


  componentDidUpdate = (prevProps, prevState) => {
    toLoadCount++;
    if (toLoad && toLoadCount > 2) {
      console.log("UPDATED!");
      this.props.loadSpinner(false);
      toLoadCount = 0;
      toLoad = false;
    }


  }
  render() {

    const position = [
      this.props.mapData.lat,
      this.props.mapData.lng
    ]
    const styleBR = {
      fill: true,
      fillColor: "#DCDCDC",
      fillOpacity: .2,
      stroke: false,
    }
    const maxHeat = 15;
    const gradient = {
      0.1: '#d9534f',
      0.5: '#F5A623',
      1.0: '#5cb85c'
    };
    if (this.props.countrySelected.geojson) {
      return (
        <Map center={position} zoom={this.props.mapData.zoom} zoomControl={this.props.mapData.zoomControl} ref="map">
          <ZoomControl position="bottomleft" />
          <LayersControl position='bottomright'>
            <LayersControl.BaseLayer name='Black And White' checked >
              <TileLayer
                url = 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.GfClkT4QxlFDC_xiI37x3Q'
                attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Satellite'>
              <TileLayer
                url = 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.GfClkT4QxlFDC_xiI37x3Q'
                attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Streets'>
              <TileLayer
                url = 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.GfClkT4QxlFDC_xiI37x3Q'
                attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <GeoJSON
            key={_.uniqueId()}
            data={GeoJsonV}
            style={this.styleMe.bind(this)}
            onEachFeature= {this.onEachFeature.bind(this)}
            filter = {this.geoFilter.bind(this)}
          ></GeoJSON>
          <GeoJSON
            data={BrazilGeo}
            onEachFeature= {this.onEachFeature2.bind(this)}
            style={this.styleMe2.bind(this)}
          ></GeoJSON>
          <GeoJSON
            key={_.uniqueId()}s
            data= {this.props.countrySelected.geojson}
            pointToLayer={this.pointToLayer.bind(this)}
          ></GeoJSON>
          {/* <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={this.props.countrySelected.geojson.features}
            longitudeExtractor={m => m.geometry.coordinates[0]}
            latitudeExtractor={m => m.geometry.coordinates[1]}
            intensityExtractor={m => parseFloat(m.properties.speed_connectivity)}
            max= {maxHeat}
            radius ={1}
            minOpacity={.7}
            gradient ={gradient}

            //
          /> */}

          </Map>

      )

    } else {
      return (
        <Map center={position} zoom={this.props.mapData.zoom} zoomControl={this.props.mapData.zoomControl} ref="map">
          <ZoomControl position="bottomleft" />
          <TileLayer
            url = 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.GfClkT4QxlFDC_xiI37x3Q'
            attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            data={GeoJsonV}
            style={this.styleMe.bind(this)}
            onEachFeature= {this.onEachFeature.bind(this)}
            filter = {this.geoFilter.bind(this)}
          ></GeoJSON>
          <GeoJSON
            data={BrazilGeo}
            onEachFeature= {this.onEachFeature2.bind(this)}
            style={styleBR}
          ></GeoJSON>
        </Map>
      )
    }


  }
}


function mapStateToProps(state) {
  return {
    mapData: state.mapData.mapInit,
    countrySelected: state.countrySelected,
    sliderData: state.sliderChanged,
    loadingData: state.loadingChanged
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    clickedCountry: ClickedCountry,
    sliderChanged: SliderChanged,
    loadSpinner: LoadSpinner
  }, dispatch)
}



export default connect(mapStateToProps, matchDispatchToProps)(SimpleExample);
