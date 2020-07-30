import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import TransactionCard from './TransactionCard'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const ExpenseCatalog = ({expenses}) => {
    return (
        <Grid item xs={6} align='left'>
            <Typography variant='h6' gutterBottom>Expenses</Typography>
            <Grid container>
                {expenses && expenses.length !== 0 ? <TransactionCard type='header'/> : null}
            </Grid>
            <SimpleBar style={{maxHeight: '35vh'}}>
                <Grid container>
                    {expenses && expenses.length !== 0 ? expenses.slice(0).reverse().map(expense => (
                        <TransactionCard
                            type='expense'
                            key={expense._id}
                            currency={expense.currency}
                            date={expense.date}
                            amount={expense.amount}
                        />
                    )) : <Typography>No expenses for this income...</Typography>}
                </Grid>
            </SimpleBar>
        </Grid>
    )
}

export default ExpenseCatalog