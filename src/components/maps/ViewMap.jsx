import React, { Component } from "react";
import Geolocation from "react-geolocation";
import Map from "./MyMapComponent";

class ViewMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: "",
      success: false
    };

    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleSuccess() {
    this.setState({ success: !this.state.success });
  }

  render() {
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
                  <Map lat={latitude} lng={longitude} />
                  {/*console.log(this.onSuccess)*/}
                  latitud= {latitude}
                  longitud={longitude}
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
