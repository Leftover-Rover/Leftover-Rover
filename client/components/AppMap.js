import React, { Component } from 'react'
import { render } from 'react-dom'
import MapGL from 'react-map-gl'
import { geolocated } from 'react-geolocated'


class AppMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 41.8781,
        longitude: -87.6298,
        zoom: 14,
        bearing: 0,
        pitch: 0
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.coords !== prevProps.coords) {
      console.log('updating state with your location')
      this.setState({
        viewport: {
          ...this.state.viewport,
          longitude: this.props.coords.longitude,
          latitude: this.props.coords.latitude,
          zoom: 20
        }
      })
    }
  }

  render() {
    // console.log('PROPS IN APP MAP:', this.props)

    // console.log('STATE IN APP MAP:', this.state)

    const { viewport } = this.state

    const MAPBOX_TOKEN =
      'pk.eyJ1IjoiZ2FycmV0dGdyZWVuIiwiYSI6ImNqb2htMzU4ajAxOW0za3Q0ejFqdW84M3UifQ.ttT97UAbxDQqXw64WCIsNA'

    return (
      <div className="map-flex">
        <MapGL
          {...viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/streets-v10"
          onViewportChange={v => this.setState({ viewport: v })}
          preventStyleDiffing={false}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  watchPosition: true,
  userDecisionTimeout: 9000
})(AppMap)
