import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    isSignupModalOpen,
    isSignupModal2Open,
} from './UiReducers';

import {
    signupUserRequest,
    signupUserSuccess,
    signupUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
} from './UserReducers';

export default combineReducers({
    signupUserRequest,
    signupUserSuccess,
    signupUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    isSignupModalOpen,
    isSignupModal2Open,
    form: formReducer,
});