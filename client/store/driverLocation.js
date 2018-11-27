import axios from 'axios'

// ACTION TYPES

const DRIVER_LOCATION = 'DRIVER_LOCATIONS'

//  INITIAL STATE

const driverLocation = {
  lat: NaN,
  lng: NaN
}

//ACTION CREATORS

const getDriverLocation = (lng, lat) => {
  return {
    type: DRIVER_LOCATION,
    lat,
    lng
  }
}

//THUNK

export const fetchDriverLocation = driverId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/drivers/${driverId}`)
    dispatch(getDriverLocation(...data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER

const driverLocationReducer = (state = driverLocation, action) => {
  switch (action.type) {
    case DRIVER_LOCATION:
      return {
        lat: action.lat,
        lng: action.lng
      }
    default:
      return state
  }
}

export default driverLocationReducer
