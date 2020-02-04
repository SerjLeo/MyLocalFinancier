import React from 'react'
import PropTypes from 'prop-types';
import { Divider, Grid, Paper, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=> ({
    cardWrapper: {
        padding: 10,
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

const TransactionCard = ({title, amount, category, type, date, income, currency}) => {
    let rexp = new RegExp("[-t:/.]", "gim")
    let dateArr = date.split(rexp)
    const classes = useStyles();
    return (
        <Paper className={classes.cardWrapper} elevation={0}>
            <Divider/>
            <Grid container className={classes.cardContainer}>
                <Grid item xs={6} md={3} className={classes.firstSection}>
                    {title}
                </Grid>
                <Grid item xs={3} md={3} className={classes.amountSection}>
                    {(type === 'true')?(<div style={{color:'green'}}>{amount}{' '}{currency}</div>):(<div style={{color:'red'}}>{'- '}{amount}{' '}{currency}</div>)}
                </Grid>
                <Grid item xs={3} md={3} className={classes.dateSection}>
                    <div>
                        {dateArr[3]}:{dateArr[4]}
                    </div>
                    <div>
                        {dateArr[2]}.{dateArr[1]}.{dateArr[0]}
                    </div>
                </Grid>
                <Grid item md={3} className={classes.hiddenSection}>{category.title}</Grid>
                {/* <Button onClick={()=>console.log(`${title} is clicked`)}></Button> */}
            </Grid>
        </Paper>
    )
}

TransactionCard.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.string,
    category: PropTypes.object,
    date: PropTypes.string,
    currency: PropTypes.string,
    income: PropTypes.string
}

export default TransactionCard
