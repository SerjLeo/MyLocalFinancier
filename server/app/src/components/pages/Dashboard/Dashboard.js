import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {getProfile, loadUser, getRate} from '../../../actions';
import Spinner from '../../layout/Spinner';
import IncomeDashboard from '../incomes/IncomeDashboard';
import CategoriesDashboard from '../categories/CategoriesDashboard';
import Welcome from './Welcome';
import AddExpense from '../expenses/AddExpense';
import LastTransactions from '../expenses/LastTransactions'

import PageLayout from '../../layout/PageLayout';

const Dashboard = ({exchangeRate, loadUser, auth: {user, loading}}) => {
    
    useEffect(()=>{
        if(!user) {
            loadUser();
        }
    }, []);
    
    if(loading) {
        return  <PageLayout>
                    <Spinner/>
                </PageLayout>
    }
    return (
        <PageLayout wrap={false}>

        </PageLayout>
    )
}

Dashboard.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    exchangeRate: state.system.exchangeRate
})
export default connect(mapStateToProps, {getProfile, loadUser, getRate})(Dashboard);
