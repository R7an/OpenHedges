import React from 'react';

import { connect } from 'react-redux';

import { Dialog, Classes, Tooltip, AnchorButton, Button, Intent  } from "@blueprintjs/core";

import { closeSignupModal } from '../../../redux/actions/UiActions';

import SignupForm from '../forms/SignupForm';

const ConnectedSignupModal = ({ closeSignupModal, isSignupModalOpen }) => (
    <Dialog
        autoFocus={true}
        title={'hello govna'}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        enforceFocus={true}
        usePortal={false}
        lazy={true}
        onClose={() => closeSignupModal(false)}
        isOpen={isSignupModalOpen}>
        <div className={Classes.DIALOG_BODY}>
            <SignupForm />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Tooltip content="This button is hooked up to close the dialog.">
                    <Button onClick={() => closeSignupModal(false)}>Close</Button>
                </Tooltip>
                <AnchorButton
                    intent={Intent.PRIMARY}
                    href="/"
                    target="_blank"
                >
                    Visit the Foundry website
                            </AnchorButton>
            </div>
        </div>
    </Dialog>
);

const mapStateToProps = state => (
    {
        isSignupModalOpen: state.isSignupModalOpen,
    }
)
const mapDispatchToProps = dispatch => (
    {
        closeSignupModal: (bool) => dispatch(closeSignupModal(bool)),
    }
)

const SignupModal = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignupModal);
export default SignupModal;




