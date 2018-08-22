import {
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    } from '../actionTypes/UserActionTypes';

    export function signupUserRequest(bool) {
        return {
            type: SIGNUP_USER_REQUEST,
            userSignUpIsLoading: bool,
        };
    }
    
    export function signupUserSuccess(user) {
        return {
            type: SIGNUP_USER_SUCCESS,
            signUpHasSucceeded: user,
        };
    }

    export function signupUserFailure(bool) {
        return {
            type: SIGNUP_USER_FAILURE,
            signUpHasFailed: bool,
        };
    }

    export function updateUserRequest(bool) {
        return {
            type: UPDATE_USER_REQUEST,
            userUpdateIsLoading: bool,
        };
    }

    export function updateUserSuccess(bool) {
        return {
            type: UPDATE_USER_SUCCESS,
            userUpdateHasSucceeded: bool,
        };
    }

    export function updateUserFailure(bool) {
        return {
            type: UPDATE_USER_FAILURE,
            userUpdateHasFailed: bool,
        };
    }