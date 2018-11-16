// ACTION TYPES

const MY_LOCATION = 'MY_LOCATIONS'

//  INITIAL STATE

const myLocation = {
  lat: NaN,
  lng: NaN
}

//ACTION CREATORS

export const getMyLocation = pos => {
  console.log('here', pos)
  return {
    type: MY_LOCATION,
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  }
}

//REDUCER

const myLocationReducer = (state = myLocation, action) => {
  switch (action.type) {
    case MY_LOCATION:
      return {
        lat: action.lat,
        lng: action.lng
      }
    default:
      return state
  }
}

export default myLocationReducer
