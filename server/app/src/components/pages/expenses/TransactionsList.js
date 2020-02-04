import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import TransactionCard from './TransactionCard';
import Spinner from '../../layout/Spinner';
import {CustomLink} from '../../utils/CustomLink'
import {Container, Paper, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.pageContainer,
    pageWrapper: theme.commonStyles.pageWrapper
}))


const TransactionsList = ({transactions, loading}) => {
    const classes = useStyles();
    useEffect(()=>{

    })
    if (loading || transactions === undefined) {
        return (
            <div className={classes.pageContainer}>
                <Spinner/>
            </div>
        )
    }
    
    if (transactions.length === 0) {
        return (
            <div className={classes.pageContainer}>
                <Container maxWidth="lg" style={{paddingTop:'10px'}}>
                    <Paper className={classes.pageWrapper}>
                        <Typography variant='h5'>
                            No transactions yet...
                        </Typography>
                    </Paper>
                </Container>
            </div>
        )
    }

    return (
        <div className={classes.pageContainer}>
            <Container maxWidth="lg" style={{paddingTop:'10px'}}>
                <Paper className={classes.pageWrapper}>
                    <Typography gutterBottom variant='h5'>Transaction history</Typography>
                    {transactions.map((transaction) => {
                            return <TransactionCard key={transaction._id} title={transaction.title} id={transaction._id} type={transaction.type} amount={transaction.amount} category={transaction.category} income={transaction.income} date={transaction.date} currency={transaction.currency}/>
                    })}
                    <Button fullWidth>
                        Load more
                    </Button>
                </Paper>
            </Container>
        </div>
    )
}

TransactionsList.propTypes = {
    transactions: PropTypes.array
}
const mapStateToProps = (state) => ({
    transactions: state.finance.finance.transactions,
    loading: state.finance.loading
})
export default connect(mapStateToProps)(TransactionsList)