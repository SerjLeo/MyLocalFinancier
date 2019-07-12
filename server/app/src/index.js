import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';

import AppServiceContext from './components/appServiceContext';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBondry from './components/errorBoundry';
// import RestoService from './services/resto-service';
// import RestoServiceContext from './components/resto-service-context';
import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <ErrorBondry>
            <AppServiceContext.Provider>
                <Router>
                    <App/>
                </Router>
            </AppServiceContext.Provider>
        </ErrorBondry>
    </Provider>
    , document.getElementById('root'));
