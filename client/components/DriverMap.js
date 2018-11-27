import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import { TOKEN } from './constant'

mapboxgl.accessToken = TOKEN

export default class DriverMap extends React.Component {
  componentDidMount = () => {
    const { lng, lat, zoom } = {
      lng: this.props.centerLng,
      lat: this.props.centerLat,
      zoom: 13.4
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    })

    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: 'mapbox/driving',
      interactive: false,
      controls: {
        inputs: false,
        instructions: false
      }
    })

    this.map.addControl(this.directions)

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left')

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true
      })
    )
  }

  componentDidUpdate = () => {
    const { origin, destination } = this.props
    this.map.on('load', () => {
      this.directions.setOrigin(origin)
      this.directions.setDestination(destination)
    })
    let markerIndex = 0
    while (this[`marker${markerIndex}`]) {
      this[`marker${markerIndex}`].remove()
      ++markerIndex
    }
    if (Array.isArray(this.props.markers) && this.props.markers.length) {
      this.props.markers.forEach((marker, index) => {
        this[`marker${index}`] = new mapboxgl.Marker()
          .setLngLat(marker)
          .addTo(this.map)
      })
    }
    if (this.props.origin.length) {
      this.directions.setOrigin(origin)
      this.directions.setDestination(destination)
      this.map.fitBounds([origin, destination], { padding: 100 })
    } else {
      this.map.flyTo({
        center: [this.props.centerLng, this.props.centerLat],
        zoom: this.props.zoom
      })
    }
    if (this.props.status === 'completed') {
      this.directions.removeRoutes()
    }
  }

  render() {
    return <div ref={el => (this.mapContainer = el)} className="map" />
  }
}
