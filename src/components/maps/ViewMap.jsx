import React, { Component } from "react";
import Geolocation from "react-geolocation";
import Map from "./MyMapComponent";

class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };

    this.handleSuccess = this.handleSuccess.bind(this);
  }

  /*
  geocodeLatLng(geocoder, map, infowindow) {
    var latlngStr = input.split(",", 2);
    var latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1])
    };
    geocoder.geocode({ location: latlng }, function(results, status) {
      if (status === "OK") {
        if (results[1]) {
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }*/

  handleSuccess(success) {
    // const geocoder = new google.maps.Geocoder();
    //const infowindow = new google.maps.InfoWindow();
    //console.log("handleSuccess");
    this.setState({
      success
    });
  }

  render() {
    //console.log(this.state.success);
    const { error, success } = this.state;

    if (error) {
      return <h1>{error}</h1>;
    }

    return (
      <Geolocation
        lazy
        onSuccess={this.handleSuccess}
        render={({
          fetchingPosition,
          position: { coords: { latitude, longitude } = {} } = {},
          error,
          getCurrentPosition
        }) => {
          if (fetchingPosition) return <h1>FETCHING POSITION</h1>;
          return (
            <div>
              <button onClick={getCurrentPosition}>Get Position</button>
              {error && <div>{error.message}</div>}
              {success && (
                <div>
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
