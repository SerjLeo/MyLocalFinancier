import React from 'react'
import {Paper, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    cardWrapper: {
        padding: 10,
        fontSize: 20,
        width: '100%'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10
    },
    amountSection: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        }
    },
    hiddenSection: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    firstSection: {
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        }
    },
    dateSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'flex-end',
            fontSize: 10
        }
    }
}))

const ExpenseTableHeader = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.cardWrapper} elevation={0}>
            <Grid container className={classes.cardContainer}>
                <Grid item xs={6} md={3} className={classes.firstSection}>
                    Title
                </Grid>
                <Grid item xs={3} md={3} className={classes.amountSection}>
                    Amount
                </Grid>
                <Grid item xs={3} md={3} className={classes.dateSection}>
                    Date
                </Grid>
                <Grid item md={3} className={classes.hiddenSection}>Category</Grid>
            </Grid>
        </Paper>
    )
}

export default ExpenseTableHeader
