import React, { Component } from "react";
import Geolocation from "react-geolocation";
import Map from "./MyMapComponent";
import img from "./loading-map.gif";

class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };

    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleSuccess(success) {
    this.setState({
      success
    });
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
          if (fetchingPosition) return <img src={img} alt={"img"} />;
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
