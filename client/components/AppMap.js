import React, { Component } from 'react'
import { HereMap } from 'rc-here-maps'

const AppMap = () => {
  return (
    <div className="map-flex">
      <div className="map-container">
        <div className="renderOverMap" />
        <HereMap
          appId="sdtDQZ6Dfg5N4JEfnqJk"
          appCode="4X46Htqh77dq_eujY5Kc1g"
          center={{ lat: 41.895366, lng: -87.639037 }}
          zoom={14}
          useHTTPS
        />
      </div>
    </div>
  )
}

export default AppMap
