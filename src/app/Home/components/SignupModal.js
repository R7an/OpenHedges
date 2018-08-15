import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Dialog, Classes, Tab, Tabs } from "@blueprintjs/core";

import SignupForm from '../forms/SignupForm';

import { closeSignupModal, openSignupModal2 } from '../../../redux/actions/UiActions';
import UserOperations from '../../../redux/operations/UserOperations';
const { signupUser } = UserOperations;

class ConnectedSignupModal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: "investors",
        }
        this._handleTabChange = this._handleTabChange.bind(this);

    }

    _handleTabChange(tabId) {
        this.setState({ activeTab: tabId });
    }

    render() {
        const { closeSignupModal, isSignupModalOpen, signupUser, openSignupModal2 } = this.props;
        return (
            <Dialog
                autoFocus={true}
                title={'OpenHedges Alpha Application'}
                canEscapeKeyClose={true}
                canOutsideClickClose={true}
                isCloseButtonShown={false}
                enforceFocus={true}
                usePortal={false}
                lazy={true}
                onClose={() => closeSignupModal(false)}
                isOpen={isSignupModalOpen}>
                <div className={Classes.DIALOG_BODY}>

                    <Tabs
                        id="TabsExample"
                        onChange={tabId => this._handleTabChange(tabId)}
                        selectedTabId={this.state.activeTab}
                    >
                        <Tab id="investors" title="Investors" panel={
                            <SignupForm
                                closeSignupModal={closeSignupModal}
                                signupUser={signupUser}
                                openSignupModal2={openSignupModal2}
                            />
                        } />
                        <Tab id="analysts" title="Analysts" panel={
                            <div>'Analysts form'</div>
                        } />
                    </Tabs>
                </div>
            </Dialog>
        )
    }
}

const mapStateToProps = state => (
    {
        isSignupModalOpen: state.isSignupModalOpen,
    }
)
const mapDispatchToProps = dispatch => (
    {
        closeSignupModal: (bool) => dispatch(closeSignupModal(bool)),
        openSignupModal2: (bool) => dispatch(openSignupModal2(bool)),
        signupUser: (user) => dispatch(signupUser(user)),
    }
)

const SignupModal = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignupModal);
export default SignupModal;



