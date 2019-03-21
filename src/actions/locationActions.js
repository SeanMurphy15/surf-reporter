import * as types from './actionTypes';


export function receiveLocation(data) {
    return {type: types.RECEIVE_LOCATION, location: data};
}

export function fetchLocation() {
    return (dispatch) => {
        fetch('https://api.weather.gov/points/21.4022,-157.7394')
            .then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                }))
            )
            .then(response => {
                if(response.status === 200){
                    dispatch(receiveLocation(response.data))
                }else{
                    var flash = {
                        type: 'error',
                        title: 'Error getting location',
                        content: 'There was an error getting the location. Please try again.'
                    }
                    dispatch({type: "DISPLAY_FLASH", data: flash})
                }
            });
    };
}