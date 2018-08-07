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
        userInfo = Object.assign({
            firstName:userInfo.firstName,
            lastName: userInfo.lastName,
            local: {
                email: userInfo.email,
                password: userInfo.password,
            },
        })
        return (dispatch) => {
            dispatch(signupUserRequest(true));
            const signupUrl = new URL(`${url}/api/users/`);
            fetch(signupUrl.href,
                {
                    method: 'POST',
                    body: JSON.stringify(userInfo),
                    credentials: 'include',
                }).then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(signupUserRequest(false));
                    debugger
                    return response;
                })
                .then(response => response.json())
                .then((response) => {
                    debugger
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