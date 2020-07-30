import React from 'react'
import {Grid, Typography} from '@material-ui/core'

const TransactionCard = ({amount, currency, type, date}) => {
    if (type === 'header') {
        return (
            <>
                <Grid item xs={6} align='left'>
                    <Typography>Amount</Typography>
                </Grid>
                <Grid item xs={6} align='left'>
                    <Typography>Date</Typography>
                </Grid>
            </>
        )
    }
    
    let rexp = new RegExp("[-t:/.]", "gim")
    let dateArr = date.split(rexp)
    return (
        <>
            <Grid item xs={6} align='left'>
                <Typography color='primary'>{amount} {currency === 'RUB'?'₽':currency === 'EUR'?'€':'$'}</Typography>
            </Grid>
            <Grid item xs={6} align='left'>
                {dateArr[2]}.{dateArr[1]}.{dateArr[0].slice(2)}
            </Grid>
        </>
    )
}

export default TransactionCard