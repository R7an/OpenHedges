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
} from './UserReducers';

export default combineReducers({
    signupUserRequest,
    signupUserSuccess,
    signupUserFailure,
    isSignupModalOpen,
    isSignupModal2Open,
    form: formReducer,
});