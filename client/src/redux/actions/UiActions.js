import {
    OPEN_SIGNUP_MODAL,
    CLOSE_SIGNUP_MODAL,
} from '../actionTypes/UiActionTypes';

export function openSignupModal(bool) {
    return {
        type: OPEN_SIGNUP_MODAL,
        isSignupModalOpen: bool,
    };
}
export function closeSignupModal(bool) {
    return {
        type: CLOSE_SIGNUP_MODAL,
        isSignupModalOpen: bool,
    };
}