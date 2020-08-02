import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {compose} from 'redux'
import TransactionCard from './TransactionCard';
import Spinner from '../../layout/Spinner';
import moment from 'moment'
import {Button, Typography} from '@material-ui/core';
import PageLayout from '../../layout/PageLayout'
import WithTranslation from '../../translation/withTranslationHOC';

const AllTransactions = ({strings}) => {

    const[params, setParams] = useState({
        limit: 100,
        skip: 0
    })

    const {skip, limit} = params

    useEffect(()=>{
        // if(expenses.length === 0) {
        //     getExpenses(limit, skip)
        // }
        // if(deposits.length === 0) {
        //     getDeposits(limit, skip)
        // }
    },[])

    const loadMore = () => {
        // const newSkip = skip + limit
        // loadMoreExpenses(limit, newSkip)
        // loadMoreDeposits(limit, newSkip)
        // setParams({
        //     ...params,
        //     skip: newSkip
        // })
    }
    

    // if (expenseLoading && depositLoading || expenses === undefined && deposits === undefined) {
    //     return <PageLayout>
    //              <Spinner/>
    //            </PageLayout>
    // }
    // if (expenses.length === 0 && deposits.length === 0) {
    //     return (
    //         <PageLayout>
    //             No transactions yet...
    //         </PageLayout>
    //     )
    // }
    //
    // let transactions = [
    //     ...expenses,
    //     ...deposits
    // ]
    //
    // transactions.sort((a, b) => {
    //     if(moment(a.date).isAfter(moment(b.date)))
    //         return -1
    //     else if (moment(a.date).isBefore(moment(b.date)))
    //         return 1
    //     else
    //         return 0
    // })


    return (
        <PageLayout>
            <Typography gutterBottom variant='h5'>Expense history</Typography>
            {/*{transactions.map((transaction, i) => {*/}
            {/*    return <TransactionCard*/}
            {/*    key={transaction._id}*/}
            {/*    transaction={transaction}*/}
            {/*    type={transaction.category === undefined?'deposit':'expense'}*/}
            {/*    />*/}
            {/*})}*/}
            <Button fullWidth onClick={() => loadMore()}>
                Load more
            </Button>
        </PageLayout>
    )
}

AllTransactions.propTypes = {
    expenses: PropTypes.array
}
const mapStateToProps = (state) => ({
    expenses: state.expense.expenses,
    expenseLoading: state.expense.loading,
    deposits: state.deposit.deposits,
    depositLoading: state.deposit.loading
})
export default compose(
    connect(mapStateToProps),
    WithTranslation
)(AllTransactions)
