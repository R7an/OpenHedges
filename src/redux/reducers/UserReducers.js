import {
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    } from '../actionTypes/UserActionTypes';

    export function signupUserRequest(state = false, action) {
        switch (action.type) {
            case SIGNUP_USER_REQUEST:
                return action.userSignUpIsLoading;
            default:
                return state;
        }
    }
    export function signupUserSuccess(state = false, action) {
        switch (action.type) {
            case SIGNUP_USER_SUCCESS:
                return action.signUpHasSucceeded;
            default:
                return state;
        }
    }
    export function signupUserFailure(state = false, action) {
        switch (action.type) {
            case SIGNUP_USER_FAILURE:
                return action.signUpHasFailed;
            default:
                return state;
        }
    }
    export function updateUserRequest(state = false, action) {
        switch (action.type) {
            case UPDATE_USER_REQUEST:
                return action.userUpdateIsLoading;
            default:
                return state;
        }
    }
    export function updateUserSuccess(state = false, action) {
        switch (action.type) {
            case UPDATE_USER_SUCCESS:
                return action.userUpdateHasSucceeded;
            default:
                return state;
        }
    }
    export function updateUserFailure(state = false, action) {
        switch (action.type) {
            case UPDATE_USER_FAILURE:
                return action.userUpdateHasFailed;
            default:
                return state;
        }
    }