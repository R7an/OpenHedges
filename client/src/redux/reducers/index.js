import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    isSignupModalOpen,
} from './UiReducers';

import {
signupUserRequest,
signupUserSuccess,
signupUserFailure,
} from './UserReducers';

export default combineReducers({
    signupUserRequest,
    signupUserSuccess,
    signupUserFailure,
    isSignupModalOpen,
    form: formReducer,
});