import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import SignupModal from './components/SignupModal';
import SignupModal2 from './components/SignupModal2';

import { openSignupModal } from '../../redux/actions/UiActions';

class ConnectedHome extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className="landing-page">
				<SignupModal />
				<SignupModal2 />
				<div className="landing-inner">
					<div className="hero-container">
						<div className="super-text-container">
							<div className="logo"></div>
							<p>Futures</p>
							<p>Stock</p>
							<p>Digital Assets</p>
						</div>
						<h1>A marketplace for clever trading ideas</h1>
						<h4>
							Asset class agnostic – lorem ipsum dolor sit amet,
							consectetur adipisicing elit.
						</h4>
						<button
							className="btn cta-button"
							onClick={()=> this.props.openSignupModal(true)}>
							Request Alpha Access
						</button>
					</div>
					<div className="graphic-container">
						<div className="hero-graphic" title="No library or expected volume of trades"></div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => (
	{
		openSignupModal: bool => dispatch(openSignupModal(bool)),
	}
);


const Home = connect(null, mapDispatchToProps)(ConnectedHome);
export default Home;