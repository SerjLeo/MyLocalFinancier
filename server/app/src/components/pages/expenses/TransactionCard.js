import React from 'react'
import PropTypes from 'prop-types';
import {Grid, Paper, makeStyles } from '@material-ui/core';
import getCategoriesIcon from '../../layout/Icons/categoriesIcons';
import getIncomeIcon from '../../layout/Icons/incomeIcons';

const useStyles = makeStyles(theme=> ({
    cardWrapper:{
        position: 'relative',
        height: 55,
        padding: 5,
        width: '70%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
          },
        marginTop: 10,
        boxShadow: '4px 6px 9px -1px rgba(0,0,0,0.33)',
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'all 1s ease-out',
        '&:hover':{
            backgroundColor: 'rgba(0,0,0,0.5)'
        }
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 20
    },
    typeBarDeposit: {
        position: "absolute",
        left:0,
        top:0,
        height: '100%',
        width: 3,
        backgroundColor: theme.palette.primary.main,
    },
    typeBarExpense: {
        position: "absolute",
        left:0,
        top:0,
        height: '100%',
        width: 3,
        backgroundColor: theme.palette.secondary.main,
    },
    amount: {
        paddingLeft: 10
    },
    iconDeposit: {
        color: theme.palette.primary.light,
    },
    iconExpense: {
        color: theme.palette.secondary.light,
    }
}))


const TransactionCard = ({transaction, type}) => {
    const classes = useStyles();
    const getCurrencyLabel = currency => {
        switch(currency){
            case 'USD':
                return '\u0024';
            case 'RUB':
                return "\u20BD";
            case 'EUR':
                return '\u20AC';
            default:
                return
        }
    }

    if(type === 'deposit') {
        return (
            <Paper className={classes.cardWrapper} elevation={0}>
                <div className={classes.typeBarDeposit}/>
                <Grid container className={classes.cardContainer}>
                    <Grid item xs={10} sm={11} className={classes.amount}>
                        {transaction.amount}{' '}{getCurrencyLabel(transaction.currency)}
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <div className={classes.iconDeposit}>
                            {getIncomeIcon(transaction.icon)()}
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    if(type === 'expense') {
        return (
            <Paper className={classes.cardWrapper} elevation={0}>
                <div className={classes.typeBarExpense}/>
                <Grid container className={classes.cardContainer}>
                    <Grid item xs={4} className={classes.amount}>
                        {transaction.amount}{' '}{getCurrencyLabel(transaction.currency)}
                    </Grid>
                    <Grid item xs={6} sm={7} className={classes.title}>
                        {transaction.title}
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <div className={classes.iconExpense}>
                            {getCategoriesIcon(transaction.icon)()}
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
    return null
}

TransactionCard.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.string,
    icon: PropTypes.string,
    category: PropTypes.object,
    date: PropTypes.string,
    currency: PropTypes.string,
    income: PropTypes.string
}

export default TransactionCard
