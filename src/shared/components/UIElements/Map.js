import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

const Map = (props) => {
  mapboxgl.accessToken = window.env.MAPBOX_ACCESS_TOKEN;

  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: center, // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });

    // Create a default Marker and add it to the map.
    new mapboxgl.Marker().setLngLat(center).addTo(map);
  }, [center, zoom]);

  return (
    <div
      id="map"
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
