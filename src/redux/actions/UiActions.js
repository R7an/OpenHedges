import {
    OPEN_SIGNUP_MODAL,
    CLOSE_SIGNUP_MODAL,
    OPEN_SIGNUP_MODAL_2,
    CLOSE_SIGNUP_MODAL_2,
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
export function openSignupModal2(bool) {
    return {
        type: OPEN_SIGNUP_MODAL_2,
        isSignupModal2Open: bool,
    };
}
export function closeSignupModal2(bool) {
    return {
        type: CLOSE_SIGNUP_MODAL_2,
        isSignupModal2Open: bool,
    };
}