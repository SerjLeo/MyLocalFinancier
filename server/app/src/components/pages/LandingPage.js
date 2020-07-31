import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux'

import { Button } from '@material-ui/core';
import WithTranslation from '../translation/withTranslationHOC'
import CustomLink from '../helpers/CustomLink'
import PageLayout from '../layout/PageLayout'

import './landingPage.scss';

import Img1 from './icons/bars-chart.svg';
import Img2 from './icons//business.svg';
import Img3 from './icons//management.svg';

const LandingPage = ({isAuthenticated, strings}) => {

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <PageLayout wrap={false} bgc='rgba(0,0,0,0.6)'>
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
                    {strings.welcomeText}
                </div>
            </div>
            <div className="welcome-container__button">
                <CustomLink to='/login' style={{margin: 10}}>
                    <Button variant="contained" color="primary" disableElevation>{strings.loginBtn}</Button>
                </CustomLink>
                <CustomLink to='/register' style={{margin: 10}}>
                    <Button variant="contained" color="primary" disableElevation>{strings.registerBtn}</Button>
                </CustomLink>
            </div>
        </PageLayout>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    language: state.profile.language
})
export default compose(
                    connect(mapStateToProps),
                    WithTranslation
                )(LandingPage);
