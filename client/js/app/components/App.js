import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {};

const App = ({children}) => {
    return (
        <div className="app-container">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
