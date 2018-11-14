import React, { Component } from 'react'
import { render } from 'react-dom'
import MapGL, { Marker } from 'react-map-gl'

const AppMap = () => {
  const MAPBOX_TOKEN =
    'pk.eyJ1IjoiZ2FycmV0dGdyZWVuIiwiYSI6ImNqb2htMzU4ajAxOW0za3Q0ejFqdW84M3UifQ.ttT97UAbxDQqXw64WCIsNA'

  const viewport = {
    latitude: 41.8781,
    longitude: -87.6298,
    zoom: 14,
    bearing: 0,
    pitch: 0
  }

  return (
    <div className="map-flex">
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </div>
  )
}

export default AppMap
