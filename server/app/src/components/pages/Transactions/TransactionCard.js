import React from 'react'
import PropTypes from 'prop-types';
import {Grid, Paper, makeStyles } from '@material-ui/core';
import getCategoriesIcon from '../../layout/Icons/categoriesIcons';
import getIncomeIcon from '../../layout/Icons/incomeIcons';
import Typography from "@material-ui/core/Typography";
import moment from 'moment'
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme=> ({
    cardWrapper:{
        position: 'relative',
        height: '100%',
        padding: 20,
        width: '100%',
        maxWidth: 900,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxShadow: '4px 6px 9px -1px rgba(0,0,0,0.33)',
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'all .2s ease-out',
        '&:hover':{
            backgroundColor: 'rgba(0,0,0,0.7)',
            transform: 'translateX(3px)'
        }
    },
    mainInfo: {
        [theme.breakpoints.down('md')]: {
            fontSize: '12px'
        },
        fontSize: '16px',
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
        backgroundColor: props => props?theme.palette.primary.main:theme.palette.expense.main,
    },
    date: {
        [theme.breakpoints.down('md')]: {
            fontSize: '12px'
        },
        fontSize: '16px',
        display: "flex",
        justifyContent: "center"
    },
    amount: {
        color: props => props?theme.palette.primary.light:theme.palette.expense.light
    },
    icon: {
        color: props => props?theme.palette.primary.light:theme.palette.expense.light
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center"
    }
}))


const TransactionCard = ({transaction, onDelete}) => {
    const {type, amount, income, category, title, currency, date} = transaction
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
            <Grid container className={classes.cardContainer} justify="center" alignItems="center" direction="row">
                <Grid item xs={3} className={classes.mainInfo}>
                    <Typography variant="subtitle2" style={{overflow: "hidden", textOverflow: "ellipsis"}}>{title}</Typography>
                    <div className={classes.amount}>
                        {amount}{' '}{getCurrencyLabel(currency)}
                    </div>
                </Grid>
                <Grid item xs={5} className={classes.iconContainer}>
                    {income
                        ?<span style={{color: income.color, marginRight: 15}}>
                            {getIncomeIcon(income.icon)()}
                        </span>
                        :null
                    }
                    {category
                        ?<span style={{color: category.color}}>
                            {getCategoriesIcon(category.icon)()}
                        </span>
                        :null
                    }
                </Grid>
                <Grid item xs={3} className={classes.date}>
                    {moment(date).format('DD-MM-YYYY')}
                </Grid>
                <Grid item xs={1}>
                    <IconButton size='small' onClick={() => onDelete(transaction)}>
                        <CloseIcon fontSize='small'/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

TransactionCard.propTypes = {
    transaction: PropTypes.object
}

export default TransactionCard
