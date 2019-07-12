import React from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions';
import MainPage from './mainPage';

import './startPage.scss';

import Img1 from './icons/bars-chart.svg';
import Img2 from './icons//business.svg';
import Img3 from './icons//management.svg';

const StartPage = ({loggedIn, login}) => {
    if (loggedIn) {
        return <MainPage/>
    } else {
        return (
            <div className="welcome-container">
                <div className="welcome-container__top">
                    <div className="welcome-container__img-container">
                        <img src={Img1} alt="" className="welcome-container__img"/>
                    </div>
                    <div className="welcome-container__img-container">
                        <img src={Img2} alt="" className="welcome-container__img"/>
                    </div>
                    <div className="welcome-container__img-container">
                        <img src={Img3} alt="" className="welcome-container__img"/>
                    </div>
                </div>
                <div className="welcome-container__bot">
                    <div className="welcome-container__text">
                        This app is intended to manage your finance and improve your.....
                    </div>
                </div>
                <div className="welcome-container__button">
                    <div className="welcome-container__button-btn" onClick={() => login()}>Login / Register</div>
                </div>

            </div>
            )
    }
}

const mapDispatchToProps = {
    login
} 


const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);