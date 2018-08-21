import React from "react";
import { connect } from "react-redux";

import { Dialog, Classes } from "@blueprintjs/core";

import SignupForm2 from "../forms/SignupForm2";

import { closeSignupModal2 } from "../../../redux/actions/UiActions";
import UserOperations from "../../../redux/operations/UserOperations";
const { updateUser } = UserOperations;

const ConnectedSignupModal2 = ({
	closeSignupModal2,
	isSignupModal2Open,
	userFormData,
	updateUser,
	userId
}) => (
	<Dialog
		autoFocus={true}
		title={`Almost there ${userFormData ? userFormData.firstName : "Name"}`}
		canEscapeKeyClose={true}
		canOutsideClickClose={true}
		isCloseButtonShown={false}
		enforceFocus={true}
		usePortal={false}
		lazy={true}
		onClose={() => closeSignupModal2(false)}
		isOpen={isSignupModal2Open}
	>
		<div className={Classes.DIALOG_BODY}>
			<div>
				We need to verify both your email and phone number for access to
				our platform.
			</div>
			<div>
				<SignupForm2
					closeSignupModal2={closeSignupModal2}
					updateUser={updateUser}
					userId={userId}
				/>
			</div>
		</div>
	</Dialog>
);

const mapStateToProps = state => ({
	isSignupModal2Open: state.isSignupModal2Open,
	userFormData: state.form.signupForm && state.form.signupForm.values,
	userId: state.signupUserSuccess
});
const mapDispatchToProps = dispatch => ({
	closeSignupModal2: bool => dispatch(closeSignupModal2(bool)),
	updateUser: (userInfo, userId) => dispatch(updateUser(userInfo, userId))
});

const SignupModal2 = connect(mapStateToProps, mapDispatchToProps)(
	ConnectedSignupModal2
);
export default SignupModal2;