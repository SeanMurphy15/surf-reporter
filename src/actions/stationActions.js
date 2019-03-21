import * as types from './actionTypes';


export function receiveStations(data) {
    return {type: types.RECEIVE_STATIONS, stations: data};
}

export function fetchStations() {
    return (dispatch) => {
        fetch('https://api.weather.gov/stations?state=HI&limit=50')
            .then(response =>
                response.json().then(data => ({
                    data: data.features,
                    status: response.status
                }))
            )
            .then(response => {
                if(response.status === 200){
                    dispatch(receiveStations(response.data))
                }else{
                    var flash = {
                        type: 'error',
                        title: 'Error getting stations',
                        content: 'There was an error getting the stations. Please try again.'
                    }
                    dispatch({type: "DISPLAY_FLASH", data: flash})
                }
            });
    };
}