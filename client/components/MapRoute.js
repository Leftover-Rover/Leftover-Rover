import React from 'react'
import { connect } from 'react-redux'
import { postOrder } from '../store'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

// import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2FycmV0dGdyZWVuIiwiYSI6ImNqb2htMzU4ajAxOW0za3Q0ejFqdW84M3UifQ.ttT97UAbxDQqXw64WCIsNA'

class Map extends React.Component {
  componentDidMount = () => {
    const { lng, lat, zoom } = {
      lng: -87.6298,
      lat: 41.8781,
      zoom: 13.4
    }

    const map = new mapboxgl.Map({
      container: this.mapContainer, // See https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    })

    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      // interactive: false,
      controls: {
        inputs: false,
        instructions: false
      }
    })

    map.addControl(this.directions, 'top-left')
    // directions.setOrigin('405 W Superior St, Chicago IL 60654')
    // directions.setDestination('3838 N Fremont St, Chicago IL 60613')
  }

  handleRoute = () => {
    const arr = [
      '321 W Superior St, Chicago IL 60654',
      '200 W Superior St, Chicago IL 60654'
    ]
    const idx = Math.random() > 0.5 ? 1 : 0
    this.directions.setOrigin('405 W Superior St, Chicago IL 60654')
    console.log(this.directions.actions.queryOrigin)
    this.directions.setDestination(arr[idx])
  }

  handleBook = () => {
    // These constants will take my lat/lng from my location for pickup location, I have hard coded them in the meantime.
    const myLat = -87.6298
    const myLng = 41.8781
    this.props.postOrder(myLat, myLng)
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div ref={el => (this.mapContainer = el)} className="map" />
        </div>
        <span>
          <button type="button" onClick={this.handleRoute}>
            Press ME
          </button>
          <button type="button" onClick={this.handleBook}>
            Book me a Route!
          </button>
        </span>
      </React.Fragment>
    )
  }
}

const mapDispatch = {
  postOrder
}

export default connect(null, mapDispatch)(Map)
