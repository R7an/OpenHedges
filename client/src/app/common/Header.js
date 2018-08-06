import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { openSignupModal } from "../../redux/actions/UiActions";

const ConnectedHeader = ({openSignupModal}) => (
	<header>
		<div className="header-inner">
			<Link to="/" className="nav-item logo-link">
				Open Hedge
			</Link>

			<div className="header-links">
				<Link to="/concept" className="nav-item">Concept</Link>
				<Link to="/rules" className="nav-item">Investors</Link>
				<Link to="/analysts-traders" className="nav-item">Analysts/Traders</Link>
				<Link to="/blog" className="nav-item">Blog</Link>
				<button className="nav-item btn btn-sign-up" onClick={()=>openSignupModal(true)}>Sign Up</button>
			</div>
		</div>
	</header>
);

const mapStateToProps = state => (
	{
		isSignupModalOpen: state.isSignupModalOpen,
	}
);
const mapDispatchToProps = dispatch => (
	{
		openSignupModal: bool => dispatch(openSignupModal(bool)),
	}
);

const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);
export default Header;