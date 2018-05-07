import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import PropTypes from "prop-types";

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */

    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCBjKHxpTGLEg3F5cCP95xwJyxxTZAvtTo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    )}
  </GoogleMap>
));

MyMapComponent.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};
export default MyMapComponent;
