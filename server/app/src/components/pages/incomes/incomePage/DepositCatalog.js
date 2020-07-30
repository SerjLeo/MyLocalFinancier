import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import TransactionCard from './TransactionCard'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const DepositCatalog = ({deposits}) => {
    return (
        <Grid item xs={6} align='left'>
            <Typography variant='h6' gutterBottom>Deposits</Typography>
            <Grid container>
                {deposits && deposits.length !== 0 ? <TransactionCard type='header'/> : null}
            </Grid>
            <SimpleBar style={{ maxHeight: '35vh' }}>
                <Grid container>
                    {deposits && deposits.length !== 0 ? deposits.slice(0).reverse().map(deposit => (
                        <TransactionCard
                            type='deposit'
                            key={deposit._id}
                            currency={deposit.currency}
                            date={deposit.date}
                            amount={deposit.amount}
                        />
                    )):'No deposits for this income...'}
                </Grid>
            </SimpleBar>
        </Grid>
    )
}

export default DepositCatalog