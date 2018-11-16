import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import { TOKEN } from './constant'

mapboxgl.accessToken = TOKEN

export default class UserMap extends React.Component {
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
    this.map.on('load', () => {
      this.directions.setOrigin(this.props.origin)
      this.directions.setDestination(this.props.destination)
    })
    if (Array.isArray(this.props.markers)) {
      console.log(this.markers)
      this.props.markers.forEach(marker =>
        new mapboxgl.Marker().setLngLat(marker).addTo(this.map)
      )
    }
  }

  render() {
    return <div ref={el => (this.mapContainer = el)} className="map" />
  }
}
