import React from 'react';

import Header from '../header';
import {StartPage} from '../pages';

import {Route, Redirect} from 'react-router-dom';

import Background from './bg.png';
import './app.scss';

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/contain repeat-y`}} className="app-container">
            <Header/>
            {/* <div>Приложение работает!!!</div> */}
            <Route path='/' component={StartPage}></Route>
        </div>
    )
}

export default App;