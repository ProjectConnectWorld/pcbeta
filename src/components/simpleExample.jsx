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
import squareHelper from './squareHelper';
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
      fillColor: "#f8c065",
      fillOpacity: .5,
      stroke: false,
    }
    const style1 = {
      fill: true,
      fillColor: "#f8c065",
      fillOpacity: 0,
      stroke: false,
    }
    const style2 = {
      fill: true,
      fillColor: "#F5A623",
      fillOpacity: .5,
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
      fillOpacity: 0,
      stroke: false,
    }
    const style1 = {
      fill: true,
      fillColor: "#F5A623",
      fillOpacity: 0,
      stroke: false,
    }


    if (this.props.countrySelected.admin1 === geoJsonFeature.properties.UF) {
      return style1;
    } else {
      return style;
    }


  }


  geoFilter = (feature) => {
    var alpha2 = alpha3ToAlpha2(feature.id);
    if (this.props.countrySelected.country === alpha2) {
      return false
    }
    return true
  }

  pointFilter = (feature) => {
    var rand = Math.random()
    //console.log("IN PF");
    //console.log(feature);
    if (this.props.countrySelected.country === 'BR' && this.props.countrySelected.admin1 === null) {
      //console.log(rand + " in BR");
      if (rand > .85) {
        return true
      } else {
        return false
      }
    } else {
      return true;
    }


  }
  // showBrazilDist = (feature) => {
  //   console.log("IN SBD");
  //   if (this.props.countrySelected.country === 'BR') {
  //     console.log("BR is selected should show dist");
  //     return true;
  //   } else {
  //     return false;
  //   }
  //
  //
  // }

  // geoFilter2 = (feature) => {
  //   if (feature.properties.UF === this.props.countrySelected.admin1) {
  //     return false;
  //   }
  //   return true;
  // }



  onEachFeature = (feature, layer) => {
    var alpha2 = alpha3ToAlpha2(feature.id);
    if (this.props.countrySelected.country === alpha2) {
      layer.setStyle({
        fillOpacity: 0
      });
    }
    layer.on({
      'mouseover': (e) => {
        if (this.props.countrySelected.country !== alpha2 && (allCountries.indexOf(alpha2) > -1)) {
          layer.setStyle({
            fillColor: "#F5A623",
            fillOpacity: 0.8
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
          if (alpha2 === 'MR' || alpha2 === 'BR') {
            layer.setStyle({
              fillColor: "#F5A623",
              fillOpacity: .5
            })
          } else {
            layer.setStyle({
              fillColor: "#f8c065",
              fillOpacity: .5
            })
          }

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
          this.props.clickedCountry(alpha2, this.props.sliderData.value, null, null);
          toLoad = true;
          //this.props.sliderChanged(this.props.sliderData.value, this.props.countrySelected.geojson);

        }

        console.log(e);
      }
    });
  }


  onEachFeature2 = (feature, layer) => {
    if (this.props.countrySelected.admin1 === feature.id) {
      layer.setStyle({
        fillOpacity: 0
      });
    }
    layer.on({
      'mouseover': (e) => {
        if (this.props.countrySelected.country === 'BR') {
          layer.setStyle({
            fillColor: "#F5A623",
            fillOpacity: 0.7
          });
        }
        if (this.props.countrySelected.admin1 === feature.id) {
          layer.setStyle({
            fillOpacity: 0
          });

        }

      },
      'mouseout': (e) => {
        layer.setStyle({
          fillColor: "#F5A623",
          fillOpacity: 0
        })
        if (this.props.countrySelected.admin1 === feature.id) {
          layer.setStyle({
            fillOpacity: 0
          });
        }

      },
      'click': (e) => {
        console.log(e);
        if (this.props.countrySelected.admin1 !== feature.id && this.props.countrySelected.country === 'BR') {
          var admin1 = e.target.feature.id;
          //console.log(e.target.feature.properties.UF);
          var admin1L = e.target.feature.properties.UF
          console.log(admin1);
          var alpha2 = 'BR'
          console.log("Calling: " + alpha2);
          this.props.loadSpinner(true);
          this.centerCountry(e.latlng, 6);
          this.props.clickedCountry(alpha2, this.props.sliderData.value, admin1, admin1L);
          toLoad = true;
        }



        console.log(e);
      }
    });
  }









  pointToLayer = (feature, latlng) => {
    // console.log(feature.properties);
    // return L.rectangle(squareHelper(latlng, .05), {
    //   color: this.getStyle(feature.properties.speed_connectivity, feature.properties.type_connectivity),
    //   fillColor: this.getStyle(feature.properties.speed_connectivity),
    //   fillOpacity: .8,
    //   stroke: false
    // }).bindPopup(popUpString(feature.properties));
    return L.circleMarker(latlng, {
      color: this.getStyle(feature.properties.speed_connectivity, feature.properties.type_connectivity),
      fillColor: this.getStyle(feature.properties.speed_connectivity),
      fillOpacity: .8,
      radius: 3,
      stroke: false
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
      fillColor: "#f8c065",
      fillOpacity: .5,
      stroke: false,
    }

    if (this.props.countrySelected.geojson) {
      if (this.props.countrySelected.country === "CO") {
        return (
          <Map center={position} zoom={this.props.mapData.zoom} zoomControl={this.props.mapData.zoomControl} ref="map">
            <ZoomControl position="bottomleft" />
            <LayersControl position='bottomright'>
              <LayersControl.BaseLayer name='Black And White' checked >
                <TileLayer
                  url = 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.GfClkT4QxlFDC_xiI37x3Q'
                  attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors '
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
              // filter={this.showBrazilDist.bind(this)}
            ></GeoJSON>
            <GeoJSON
              key={_.uniqueId()}s
              data= {this.props.countrySelected.geojson}
              pointToLayer={this.pointToLayer.bind(this)}
              filter = {this.pointFilter.bind(this)}
            ></GeoJSON>
            </Map>

        )

      } else {
        return (
          <Map center={position} zoom={this.props.mapData.zoom} zoomControl={this.props.mapData.zoomControl} ref="map">
            <ZoomControl position="bottomleft" />
            <LayersControl position='bottomright'>
              <LayersControl.BaseLayer name='Black And White' checked >
                <TileLayer
                  url = 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.GfClkT4QxlFDC_xiI37x3Q'
                  attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors '
                />
              </LayersControl.BaseLayer>
              {/* <LayersControl.BaseLayer name='Satellite'>
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
              </LayersControl.BaseLayer> */}
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
              // filter={this.showBrazilDist.bind(this)}
            ></GeoJSON>
            <GeoJSON
              key={_.uniqueId()}s
              data= {this.props.countrySelected.geojson}
              pointToLayer={this.pointToLayer.bind(this)}
              filter = {this.pointFilter.bind(this)}
            ></GeoJSON>
            </Map>

        )

      }


    } else {
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
            {/* <LayersControl.BaseLayer name='Satellite'>
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
            </LayersControl.BaseLayer> */}
          </LayersControl>

          <GeoJSON
            data={GeoJsonV}
            style={this.styleMe.bind(this)}
            onEachFeature= {this.onEachFeature.bind(this)}
            filter = {this.geoFilter.bind(this)}
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
