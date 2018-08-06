import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import pages from "./pages";

import Layout from "../app/common/Layout";

import Home from "../app/Home/Home.js";
debugger

// Must construct an object out of render() function for
// both performance and the correctness of module states, i.e. this.state.

export default () => (
	<Layout>
		<Switch>
			<Route exact path="/" component={Home} />

			{/* Import all routes, permissions are verified in each route */}
			{pages
				.filter(page => page.route)
				.map(page => (
					<Route
						key={page.constants.NAME}
						path={`/${page.constants.NAME}`}
						component={page.route}
					/>
				))}
			<Redirect to="/" />
		</Switch>
	</Layout>
);