import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../redux/store/index';
import routes from '../routing/routes';

const { store, persistor } = configureStore();


const App = () => (
    <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
            <Router>
                <Route component={routes} />
            </Router>
        </PersistGate>
    </Provider>
);

export default App;