import {
    signupUserRequest,
    signupUserSuccess,
    signupUserFailure,
} from '../actions/UserActions';

const url = 'http://localhost:8080'

const UserOperations = (() => {
    return {
        signupUser: signupUser,
    }
    function signupUser(userInfo) {
        return (dispatch) => {
            dispatch(signupUserRequest(true));
            const signupUrl = new URL(`${url}/api/users/`);
            fetch(signupUrl.href,
                {
                    method: 'POST',
                    body: JSON.stringify(userInfo),
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json'
                      }
                }).then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(signupUserRequest(false));
                    return response;
                })
                .then(response => response.json())
                .then((response) => {
                    dispatch(signupUserSuccess(true));
                    // return dispatch(loginUserSuccess(response.user));
                    return response;
                })
                .catch((err) => {
                    dispatch(signupUserFailure(true));
                    //dispatch(loginUserFailure(true));
                    throw Error(err);
                });
        }
    }
})();

export default UserOperations;