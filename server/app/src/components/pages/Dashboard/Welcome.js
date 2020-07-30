import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from 'redux'

import {getProfile, getRate} from '../../../actions';
import Spinner from '../../layout/Spinner';
import ExchangeRates from './ExchangeRates';

//Material-UI
import {Typography, Button} from '@material-ui/core';
import SectionLayout from '../../layout/SectionLayout';
import CustomLink from '../../helpers/CustomLink';
import WithTranslation from '../../translation/withTranslationHOC';


export const Welcome = ({getProfile, getRate, exchangeRate, profile: {profile, loading}, auth: {user}, strings}) => {
    useEffect(()=>{
        if(!profile) {
            getProfile();
        }
        if(!exchangeRate) {
            getRate();
        }
    }, []);
    
    if(loading) {
        return  <SectionLayout>
                    <Spinner/>
                </SectionLayout>
    }
    return (
        <SectionLayout>
            <div style={{width: '100%', display:'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
                <Typography variant='h4'>{strings.greetings}{profile? profile.name:user && user.name}!</Typography>
                {profile !== null ? null : (
                    <>
                        <CustomLink to='/createprofile'>
                
                            <Button style={{color: 'rgb(28,26,26)'}}>Set profile</Button>
                        </CustomLink>
                    </>
                )}
                {exchangeRate?<ExchangeRates exchangeRate={exchangeRate}/>:null}
            </div>
        </SectionLayout>
    )
}

Welcome.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    exchangeRate: state.system.exchangeRate
})

export default compose(
    connect(mapStateToProps, {getProfile, getRate}),
    WithTranslation
    )(Welcome);