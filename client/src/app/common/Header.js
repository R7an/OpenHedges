import React from "react";

import { Link } from "react-router-dom";

const Header = () => (
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
				<button className="nav-item btn btn-sign-up">Sign Up</button>
			</div>
		</div>
	</header>
);

export default Header;