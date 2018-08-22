import { SubmissionError } from 'redux-form';

import {
    signupUserRequest,
    signupUserSuccess,
    signupUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
} from '../actions/UserActions';

let url= (process.env.NODE_ENV === 'production')? 'ubuntu@ec2-54-153-37-9.us-west-1.compute.amazonaws.com': 'http://localhost:8080';

const UserOperations = (() => {
    return {
        signupUser: signupUser,
        updateUser: updateUser,
    }
    function signupUser(userInfo) {
        return async (dispatch) => {
            dispatch(signupUserRequest(true));
            const signupUrl = new URL(`${url}/api/users/`);
            const response = await fetch(signupUrl.href,
                {
                    body: JSON.stringify(userInfo),
                    credentials: 'include',
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    dispatch(signupUserRequest(false));
                    return response;
                })
                .then(response => response.json())
                .then((response) => {
                    dispatch(signupUserSuccess(response.item));
                    return response;
                })
                .catch((err) => {
                    dispatch(signupUserFailure(true));
                    if (err.message === 'Conflict') {
                        throw new SubmissionError({
                            email: 'There is already a user registered with this email.',
                            _error: 'Signup failed!',
                        });
                    }
                    throw new Error(err);
                }
                );
            return response;
        }
    }

    function updateUser(userInfo, userId) {
        return async (dispatch) => {
            dispatch(updateUserRequest(true));
            const signupUrl = new URL(`${url}/api/users/${userId}`);
            const response = await fetch(signupUrl.href,
                {
                    body: JSON.stringify(userInfo),
                    credentials: 'include',
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    dispatch(updateUserRequest(false));
                    return response;
                })
                .then(response => response.json())
                .then((response) => {
                    dispatch(updateUserSuccess(true));
                    return response;
                })
                .catch((err) => {
                    dispatch(updateUserFailure(true));
                    if (err.message === 'Conflict') {
                        throw new SubmissionError({
                            email: 'There is already a user registered with this email.',
                            _error: 'Signup failed!',
                        });
                    }
                    throw new Error(err);
                }
                )
            return response;
        }
    }
})();

export default UserOperations;