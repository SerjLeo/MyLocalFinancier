import React from 'react'
import PropTypes from 'prop-types';
import {Grid, Paper, makeStyles } from '@material-ui/core';
import getCategoriesIcon from '../../layout/Icons/categoriesIcons';
import getIncomeIcon from '../../layout/Icons/incomeIcons';

const useStyles = makeStyles(theme=> ({
    cardWrapper:{
        position: 'relative',
        height: 70,
        padding: 20,
        width: '100%',
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
    typeBar: {
        position: "absolute",
        left:0,
        top:0,
        height: '100%',
        width: 3,
        backgroundColor: props => props?theme.palette.primary.main:theme.palette.secondary.main,
    },
    amount: {
        paddingLeft: 10
    },
    icon: {
        color: props => props?theme.palette.primary.light:theme.palette.secondary.light
    }
}))


const TransactionCard = ({transaction}) => {
    const {type, amount, income, category, title} = transaction

    const classes = useStyles(type);

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

    return (
        <Paper className={classes.cardWrapper} elevation={0}>
            <div className={classes.typeBar}/>
            <Grid container className={classes.cardContainer}>
                <Grid item xs={10} sm={11} className={classes.amount}>
                    {amount}{' '}{getCurrencyLabel(income.currency)}
                </Grid>
                <Grid item xs={6} sm={7} className={classes.title}>
                    {title}
                </Grid>
                <Grid item xs={2} sm={2}>
                    <span className={classes.icon}>
                        {getIncomeIcon(income.icon)()}
                    </span>
                    <span>
                        {getCategoriesIcon(category.icon)()}
                    </span>
                </Grid>
            </Grid>
        </Paper>
    )
}

TransactionCard.propTypes = {
    transaction: PropTypes.object
}

export default TransactionCard
