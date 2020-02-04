import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {getCurrentProfile, getCurrentFinance, loadUser, getRate} from '../../../actions';
import Spinner from '../../layout/Spinner';
import IncomeDasboard from '../incomes/IncomeDashboard';
import CategoriesDashboard from '../categories/CategoriesDashboard';
import ExchangeRates from './ExchangeRates';
import AddExpense from '../expenses/AddExpense';
import LastTransactions from '../expenses/LastTransactions'

//Material-UI

import {MyButton, CustomLink, PaperRow} from '../../Theme/Theming';
import {Paper} from '@material-ui/core';
import PageLayout from '../../layout/PageLayout';


const Dashboard = ({getCurrentProfile, getRate, loadUser, getCurrentFinance, loading, profile: {profile}, auth: {user}}) => {
    
    useEffect(()=>{
        loadUser();
        getCurrentFinance(); 
        getRate();
        getCurrentProfile();
    }, [loading]);

    if(loading) {
        return  <PageLayout wrap={false}>
                    <Spinner/>
                </PageLayout>
    }
    return (
        <PageLayout wrap={false}>
                <Paper style={{marginBottom: '10px'}}>
                    <PaperRow>
                        <span style={{padding:'15px'}}>Welcome, {profile? profile.name:user && user.name}!</span>
                        {profile !== null ? null : (
                            <>
                                <CustomLink to='/createprofile'>
                        
                                    <MyButton style={{color: 'rgb(28,26,26)'}}>Set profile</MyButton>
                                </CustomLink>
                            </>
                        )}
                        <ExchangeRates/>
                    </PaperRow>
                </Paper>
                <IncomeDasboard/>
                <CategoriesDashboard/>
                <AddExpense/>
                <LastTransactions/>
        </PageLayout>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    loading: state.finance.loading
})
export default connect(mapStateToProps, {getCurrentProfile, getCurrentFinance, loadUser, getRate})(Dashboard);
