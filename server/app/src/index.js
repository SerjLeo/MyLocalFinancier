import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';

import AppServiceContext from './components/appServiceContext/appServiceContext';
import FinanceService from './services/financeService'
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBondry from './components/errorBoundry';
//Redux
import store from './store';
import {Provider} from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/theme'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ErrorBondry>
                <AppServiceContext.Provider value={FinanceService}>
                    <Router>
                        <App store={store}/>
                    </Router>
                </AppServiceContext.Provider>
            </ErrorBondry>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));
