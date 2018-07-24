import React from "react";

import { Link } from "react-router-dom";

const Header = () => (
	<header>
		<Link to="/" className="nav-item logo-link">
			OpenHedges
		</Link>

		<div className="header-links">
			<Link to="/concept" className="nav-item">Concept</Link>
			<Link to="/rules" className="nav-item">Rules</Link>
			<Link to="/blog" className="nav-item">Blog</Link>
			<button className="nav-item btn btn-sign-up">Sign Up</button>
		</div>
	</header>
);

export default Header;