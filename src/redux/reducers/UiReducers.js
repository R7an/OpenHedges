import {
    OPEN_SIGNUP_MODAL,
    CLOSE_SIGNUP_MODAL,
    OPEN_SIGNUP_MODAL_2,
    CLOSE_SIGNUP_MODAL_2,
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
export function isSignupModal2Open(state = false, action) {
    switch (action.type) {
        case OPEN_SIGNUP_MODAL_2:
            return action.isSignupModal2Open;
        case CLOSE_SIGNUP_MODAL_2:
            return action.isSignupModal2Open;
        default:
            return state;
    }
}
