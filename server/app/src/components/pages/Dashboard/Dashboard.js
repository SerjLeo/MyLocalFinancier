import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";

import Spinner from '../../layout/Spinner';
import IncomeDashboard from '../incomes/IncomeDashboard';
import CategoriesDashboard from '../categories/CategoriesDashboard';
import AddTransaction from '../Transactions/AddTransaction';
import PageLayout from '../../layout/PageLayout';
import ExchangeRates from "./ExchangeRates";
import SectionLayout from "../../layout/SectionLayout";
import RecentTransactions from "../Transactions/RecentTransactions";

const useStyles = makeStyles(theme => ({
    gridItem: {
        height: '100%'
    },
    disappear: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}))


const Dashboard =  ({loading}) => {
    const classes = useStyles()
    
    if(loading) {
        return  <PageLayout>
                    <Spinner/>
                </PageLayout>
    }
    return (
        <PageLayout wrap={false}>
            <Grid container justify="space-around" spacing={1} direction="row">
                <Grid item className={classes.gridItem} xs={12} sm={7}>
                    <IncomeDashboard/>
                    <CategoriesDashboard/>
                    <AddTransaction/>
                </Grid>
                <Grid item className={classes.gridItem} xs={12} sm={5} md={5}>
                    <SectionLayout noPadding>
                        <div className={classes.disappear}>
                            <ExchangeRates/>
                            <Divider/>
                        </div>
                        <RecentTransactions/>
                    </SectionLayout>
                </Grid>
            </Grid>
        </PageLayout>
    )
}

Dashboard.propTypes = {
    loading: PropTypes.bool
}
const mapStateToProps = (state) => ({
    loading: state.auth.loading
})
export default connect(mapStateToProps)(Dashboard);
