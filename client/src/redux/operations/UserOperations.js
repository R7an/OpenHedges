import { SubmissionError } from 'redux-form';

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
        return async (dispatch) => {
            dispatch(signupUserRequest(true));
            const signupUrl = new URL(`${url}/api/users/`);
            await fetch(signupUrl.href,
                {
                    method: 'POST',
                    body: JSON.stringify(userInfo),
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode: 'cors'
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    dispatch(signupUserRequest(false));
                    return response;
                })
                .then(response => response.json())
                .then((response) => {
                    dispatch(signupUserSuccess(true));
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
        }
    }
})();

export default UserOperations;