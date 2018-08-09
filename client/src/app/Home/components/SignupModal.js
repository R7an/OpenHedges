import React from "react";

import { connect } from "react-redux";

import { Dialog, Classes, Button } from "@blueprintjs/core";

import { closeSignupModal } from "../../../redux/actions/UiActions";

import SignupForm from "../forms/SignupForm";
import UserOperations from "../../../redux/operations/UserOperations";

const { signupUser } = UserOperations;
const ConnectedSignupModal = ({
    closeSignupModal,
    isSignupModalOpen,
    signupUser
}) => (
    <Dialog
        autoFocus={true}
        title={"Sign Up"}
        canEscapeKeyClose={true}
        isCloseButtonShown={false}
        canOutsideClickClose={true}
        enforceFocus={true}
        usePortal={false}
        lazy={true}
        onClose={() => closeSignupModal(false)}
        isOpen={isSignupModalOpen}
    >
        <div className={Classes.DIALOG_BODY}>
            <SignupForm signupUser={signupUser} />
        </div>
    </Dialog>
);

const mapStateToProps = state => ({
    isSignupModalOpen: state.isSignupModalOpen
});
const mapDispatchToProps = dispatch => ({
    closeSignupModal: bool => dispatch(closeSignupModal(bool)),
    signupUser: user => dispatch(signupUser(user))
});

const SignupModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedSignupModal);
export default SignupModal;