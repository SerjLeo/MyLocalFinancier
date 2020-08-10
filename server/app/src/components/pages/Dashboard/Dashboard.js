import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles';

import {getProfile, loadUser} from '../../../actions';
import Spinner from '../../layout/Spinner';
import IncomeDashboard from '../incomes/IncomeDashboard';
import CategoriesDashboard from '../categories/CategoriesDashboard';
import Widgets from './Widgets'
import AddTransaction from '../Transactions/AddTransaction';
import LastTransactions from '../expenses/LastTransactions'

import PageLayout from '../../layout/PageLayout';
import ExchangeRates from "./ExchangeRates";
import SectionLayout from "../../layout/SectionLayout";

const useStyles = makeStyles(theme => ({
    gridItem: {
        height: '100%'
    },
    sidePanel: {
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}))


const Dashboard =  ({loadUser, auth: {user, loading}}) => {
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
                    <AddTransaction/>
                </Grid>
                <Grid item className={styles.sidePanel} sm={4} md={4}>
                    <SectionLayout noPadding>
                        <ExchangeRates/>
                    </SectionLayout>
                </Grid>
            </Grid>
        </PageLayout>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, {getProfile, loadUser})(Dashboard);
