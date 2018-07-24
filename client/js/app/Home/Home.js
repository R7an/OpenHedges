import React from "react";
// import axios from 'src/common/myAxios';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className="landing-page">
				<div className="hero-container">
					<div className="super-text-container">
						<div className="logo" />
						<p>Futures</p>
						<p>Stock</p>
						<p>Digital</p>
					</div>
					<h1>Best Ideas Investment Platform</h1>
					<h4>
						Asset class agnostic – lorem ipsum dolor sit amet,
						consectetur adipisicing elit.
					</h4>
					<button className="btn cta-button">Request Alpha Access</button>
				</div>
				<div className="signup-animator">
					<h3>Someone Signed Up</h3>
					<h3>Someone Else Signed Up</h3>
					<h3>Someone Else-else Signed Up</h3>
					<h3>Someone Else-else-else Signed Up</h3>
				</div>
			</div>
		);
	}
}

export default Home;