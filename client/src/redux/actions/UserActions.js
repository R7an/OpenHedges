import {
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    } from '../actionTypes/UserActionTypes';

    export function signupUserRequest(bool) {
        return {
            type: SIGNUP_USER_REQUEST,
            userSignUpIsLoading: bool,
        };
    }
    export function signupUserSuccess(bool) {
        return {
            type: SIGNUP_USER_SUCCESS,
            signUpHasSucceeded: bool,
        };
    }
    export function signupUserFailure(bool) {
        return {
            type: SIGNUP_USER_FAILURE,
            signUpHasFailed: bool,
        };
    }