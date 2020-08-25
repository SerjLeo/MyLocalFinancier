import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {compose} from 'redux'
import TransactionCard from './TransactionCard';
import Spinner from '../../layout/Spinner';
import {Typography} from '@material-ui/core';
import WithTranslation from '../../translation/withTranslationHOC';
import {deleteSingleTransaction, getIncomes, getTransactions, setAlert, updateIncome} from "../../../actions";
import {makeStyles} from "@material-ui/styles";
import CustomLink from "../../helpers/CustomLink";
import Button from "@material-ui/core/Button";
import FinanceService from "../../../services/FinanceService";

const useStyles = makeStyles({
    container: {
        width: '100%',
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    }
})

const RecentTransactions = ({
    strings,
    transactions,
    loading,
    getTransactions,
    getIncomes,
    updateIncome,
    incomes,
    incomeLoading,
    setAlert,
    deleteSingleTransaction
}) => {

    const classes = useStyles()
    let financeService = new FinanceService()
    useEffect(() => {
        if(!transactions || loading) {
            getTransactions()
        }
        if(!incomes) {
            getIncomes()
        }
    }, [])


    if (transactions && transactions.length === 0 && !loading) {
        return (
            <div style={{marginTop: 15}}>
                {strings.empty}
            </div>
        )
    }

    const handleDelete = transaction => {
        try {
            if(transaction.income) {
                const income = incomes.find(i => i._id === transaction.income._id)
                const newBalance = financeService.calcBalance(income.balance, transaction.amount, !transaction.type)
                updateIncome(income._id, newBalance)
            }
            deleteSingleTransaction(transaction._id)
        } catch (error) {
            setAlert(error.message, 'warning')
        }
    }

    return (
    loading || incomeLoading
        ?<Spinner/>
        :<div className={classes.container}>
            <Typography variant='h5'>{strings.title}</Typography>
            <div className={classes.container}>
                {transactions?transactions.slice(0,5).map(transaction => {
                    return <TransactionCard
                        key={transaction._id}
                        transaction={transaction}
                        onDelete={handleDelete}
                    />
                }):null}
            </div>
            <CustomLink to='/transactions' style={{width: '100%'}}>
                <Button fullWidth style={{marginTop: 10}} variant="outlined">
                    {strings.toAll}
                </Button>
            </CustomLink>
        </div>
    )
}

RecentTransactions.propTypes = {
    transactions: PropTypes.array,
    loading: PropTypes.bool
}
const mapStateToProps = (state) => ({
    transactions: state.transaction.transactions,
    incomes: state.income.incomes,
    incomeLoading: state.income.loading,
    loading: state.transaction.transactions_loading
})
export default compose(
    connect(mapStateToProps, {getTransactions, setAlert, getIncomes, updateIncome, deleteSingleTransaction}),
    WithTranslation
)(RecentTransactions)
