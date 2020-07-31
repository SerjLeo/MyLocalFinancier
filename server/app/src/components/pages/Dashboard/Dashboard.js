import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles';

import {getProfile, loadUser, getRate} from '../../../actions';
import Spinner from '../../layout/Spinner';
import IncomeDashboard from '../incomes/IncomeDashboard';
import CategoriesDashboard from '../categories/CategoriesDashboard';
import Widgets from './Widgets'
import Welcome from './Welcome';
import AddExpense from '../expenses/AddExpense';
import LastTransactions from '../expenses/LastTransactions'

import PageLayout from '../../layout/PageLayout';

const useStyles = makeStyles(theme => ({
    gridItem: {
        height: '100%'
    },
    sidePanel: {
        backgroundColor: 'red',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}))


const Dashboard = ({exchangeRate, loadUser, auth: {user, loading}}) => {
    const styles = useStyles()
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
            <Grid container justify="space-around" spacing={3} direction="row">
                <Grid item className={styles.gridItem} xs={12} sm={7}>
                    <Widgets/>
                    <IncomeDashboard/>
                    <CategoriesDashboard/>
                </Grid>
                <Grid item className={styles.sidePanel} sm={4} md={4}>
                    Hello_2
                </Grid>
            </Grid>
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
