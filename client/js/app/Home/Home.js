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
				<div className="landing-inner">
					<div className="hero-container">
						<div className="super-text-container">
							<div className="logo"></div>
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
					<div className="hero-graphic">
						<div>test</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;