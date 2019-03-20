import * as types from './actionTypes';


export function receiveUsers(data) {
    return {type: types.RECEIVE_USERS, users: data};
}

export function fetchUsers() {
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                }))
            )
            .then(response => {
                if(response.status === 200){
                    dispatch(receiveUsers(response.data))
                }else{
                    var flash = {
                        type: 'error',
                        title: 'Error getting user list',
                        content: 'There was an error getting the user list. Please try again.'
                    }
                    dispatch({type: "DISPLAY_FLASH", data: flash})
                }
            });
    };
}