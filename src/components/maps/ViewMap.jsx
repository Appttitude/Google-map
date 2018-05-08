import React, { Component } from "react";
import Geolocation from "react-geolocation";
import Map from "./MyMapComponent";
import img from "./loading-map.gif";
import googleMapsClient from "@google/maps";

class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null
    };
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
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
  }

  render() {
    const { fullCity, country, error } = this.state;

    if (error) {
      return <h1>{error}</h1>;
    }

    return (
      <Geolocation
        lazy
        onError={this.handleError}
        onSuccess={this.handleSuccess}
        render={({
          fetchingPosition,
          position: { coords: { latitude, longitude } = {} } = {},
          error,
          getCurrentPosition
        }) => {
          if (fetchingPosition) return <img src={img} alt={"img"} />;
          return (
            <div>
              <button onClick={getCurrentPosition}>Get Position</button>
              {error && <div>{error.message}</div>}
              {country && (
                <div>
                  <h3>Country:{country}</h3>
                  <h4>City:{fullCity.split(",").shift()}</h4>
                  {/*shift toma primer valor del arreglo*/}
                  <Map lat={latitude} lng={longitude} isMarkerShown />
                </div>
              )}
            </div>
          );
        }}
      />
    );
  }
}

export default ViewMap;
