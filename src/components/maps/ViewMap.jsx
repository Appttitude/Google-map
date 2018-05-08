import React, { Component } from "react";
import Geolocation from "react-geolocation";
import Map from "./MyMapComponent";
import img from "./loading-map.gif";
import googleMapsClient from "@google/maps";

const DetailMap = ({ latitude, longitude, country, fullCity }) => (
  <div>
    <h3>Country:{country}</h3>
    <h4>City:{fullCity.split(",").shift()}</h4>
    {/*shift toma primer valor del arreglo*/}

    <Map lat={latitude} lng={longitude} isMarkerShown />
  </div>
);

class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null
    };
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderMap = this.renderMap.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //const lat = this.state.latitude;
    //debugger;
    //console.log(nextState.country);
    //console.log(nextState);
    // console.log(typeof nextState.latitude);
    return nextState.country !== this.state.country;
  }

  handleError(error) {
    this.setState({ error: error.message });
  }

  handleSuccess(position) {
    const gmc = googleMapsClient.createClient({
      key: "AIzaSyCBjKHxpTGLEg3F5cCP95xwJyxxTZAvtTo",
      Promise: Promise
    });
    gmc
      .reverseGeocode({
        latlng: `${position.coords.latitude},${position.coords.longitude}`
      })
      .asPromise()
      .then(response => {
        let country = "",
          fullCity = "";
        response.json.results.forEach(result => {
          if (result.types.includes("country"))
            country = result.formatted_address;
          if (result.types.includes("administrative_area_level_2"))
            fullCity = result.formatted_address;
        });

        this.setState({ country, fullCity });
      })
      .catch(error => {
        this.setState({ error });
      });
    console.log(position);
  }

  renderMap({
    fetchingPosition,
    position: { coords: { latitude, longitude } = {} } = {},
    error,
    getCurrentPosition
  }) {
    const { fullCity, country } = this.state;
    if (error) {
      return <h1>{error}</h1>;
    }
    if (fetchingPosition) return <img src={img} alt={"img"} />;
    return (
      <div>
        <button onClick={getCurrentPosition}>Get Position</button>
        {error && <div>{error.message}</div>}
        {country && (
          <DetailMap
            latitude={latitude}
            longitude={longitude}
            country={country}
            fullCity={fullCity}
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <Geolocation
        lazy
        onError={this.handleError}
        onSuccess={this.handleSuccess}
        render={this.renderMap}
      />
    );
  }
}

export default ViewMap;
