import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {compose} from 'redux'
import TransactionCard from './TransactionCard';
import CustomLink from '../../helpers/CustomLink'
import SectionLayout from '../../layout/SectionLayout'
import Spinner from '../../layout/Spinner'
import {Button, makeStyles} from '@material-ui/core'
import {getExpenses, getDeposits} from '../../../actions'
import moment from 'moment'
import WithTranslation from '../../translation/withTranslationHOC'

const useStyles = makeStyles(theme=> ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 'auto',
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btn: {
        marginTop: 20
    }
}))

const LastTransactions = ({expenses, expenseLoading, getExpenses, deposits, depositLoading, getDeposits, strings}) => {

    useEffect(() => {
        getExpenses()
        getDeposits()
    }, [])
    const classes = useStyles();
    if (expenseLoading && depositLoading || expenses === undefined && deposits === undefined) {
        return <SectionLayout>
                 <Spinner/>
               </SectionLayout>
    }
    if (expenses.length === 0 && deposits.length === 0) {
        return (
            <SectionLayout>
                No expenses yet...
            </SectionLayout>
        )
    }

    let transactions = [
        ...expenses,
        ...deposits
    ]

    transactions.sort((a, b) => {
        if(moment(a.date).isAfter(moment(b.date)))
            return -1
        else if (moment(a.date).isBefore(moment(b.date)))
            return 1
        else 
            return 0
    })

    return (
        <SectionLayout title={strings.title}>
            <div className={classes.container}>
                {transactions.map((transaction, i) => {
                    while(i < 5) {
                        return <TransactionCard
                        key={transaction._id}
                        transaction={transaction}
                        type={transaction.category === undefined?'deposit':'expense'}
                        />
                    }
                    return null
                })}
                <CustomLink to='/expenses' className={classes.btn}>
                    <Button color='primary' variant='outlined'>{strings.loadMoreButtonText}</Button>
                </CustomLink>
            </div>
        </SectionLayout>
    )
}

LastTransactions.propTypes = {
    expenses: PropTypes.array
}
const mapStateToProps = (state) => ({
    expenses: state.expense.expenses,
    expenseLoading: state.expense.loading,
    deposits: state.deposit.deposits,
    depositLoading: state.deposit.loading
})

export default compose(
    connect(mapStateToProps, {getExpenses, getDeposits}),
    WithTranslation
)(LastTransactions)
