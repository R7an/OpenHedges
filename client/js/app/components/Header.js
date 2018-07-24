import React from "react";

import { Link } from "react-router-dom";

const Header = () => (
	<header>
		<Link to="/" classname="nav-item logo-link">
			OpenHedges
		</Link>

		<div className="header-links">
			<Link to="/concept" classname="nav-item">Concept</Link>
			<Link to="/rules" classname="nav-item">Rules</Link>
			<Link to="/blog" classname="nav-item">Blog</Link>
			<button classname="nav-item btn btn-sign-up">Sign Up</button>
		</div>
	</header>
);

export default Header;