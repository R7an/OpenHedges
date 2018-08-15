import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {};

const Layout = ({ children }) =>
    (
        <div className="app-container">
            <Header />
            {children}
            <Footer />
        </div>
    );

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;