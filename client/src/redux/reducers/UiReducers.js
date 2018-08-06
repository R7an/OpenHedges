import {
    OPEN_SIGNUP_MODAL,
    CLOSE_SIGNUP_MODAL,
} from '../actionTypes/UiActionTypes';

export function isSignupModalOpen(state = false, action) {
    switch (action.type) {
        case OPEN_SIGNUP_MODAL:
            return action.isSignupModalOpen;
        case CLOSE_SIGNUP_MODAL:
            return action.isSignupModalOpen;
        default:
            return state;
    }
}
