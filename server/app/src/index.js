import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.scss';
import App from './components/app';

import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundary from './components/errorBoundry';
//Redux
import store from './store';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme/theme'

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <ErrorBoundary>
                    <Router>
                        <App store={store}/>
                    </Router>
            </ErrorBoundary>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
