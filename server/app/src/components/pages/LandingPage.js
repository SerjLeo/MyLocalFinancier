import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {compose} from 'redux'

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';
import WithTranslation from '../translation/withTranslationHOC'

import './landingPage.scss';

import Img1 from './icons/bars-chart.svg';
import Img2 from './icons//business.svg';
import Img3 from './icons//management.svg';


const MyButton = styled(Button)({
    color: '#f3f3f3',
    padding: '10px 30px',
    margin: '5px',
    background: 'rgba(255,255,255,0.1)'
});

const CustomLink = styled(Link)({
    textDecoration: "none",
    color: "#f7f7f7",
    margin: "10px"
    
});
const LandingPage = ({isAuthenticated, strings}) => {

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }
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
                    {strings.welcomeText}
                </div>
            </div>
            <div className="welcome-container__button">
                <CustomLink to='/login'>
                    <MyButton  onClick={() => {}}>{strings.loginBtn}</MyButton>
                </CustomLink>
                <CustomLink to='/register'>
                    <MyButton >{strings.registerBtn}</MyButton>
                </CustomLink>
            </div>
        </div>
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