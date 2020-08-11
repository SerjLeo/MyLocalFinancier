import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {compose} from 'redux'
import TransactionCard from './TransactionCard';
import Spinner from '../../layout/Spinner';
import moment from 'moment'
import {Typography} from '@material-ui/core';
import WithTranslation from '../../translation/withTranslationHOC';
import {getTransactions} from "../../../actions";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    container: {
        width: '100%',
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    }
})

const RecentTransactions = ({strings, transactions, loading, getTransactions}) => {

    const classes = useStyles()

    useEffect(() => {
        if(transactions.length === 0) {
            getTransactions(5,0)
        }
    })


    if (transactions.length === 0 && !loading) {
        return (
            <div>
                No transactions yet...
            </div>
        )
    }

    return (
    loading
        ?<Spinner/>
        :<div className={classes.container}>
            <Typography variant='h5'>{strings.title}</Typography>
            <div className={classes.container}>
                {transactions.slice(0,5).map((transaction, i) => {
                    return <TransactionCard
                        key={transaction._id}
                        transaction={transaction}
                    />
                })}
            </div>
        </div>
    )
}

RecentTransactions.propTypes = {
    transactions: PropTypes.array,
    loading: PropTypes.bool
}
const mapStateToProps = (state) => ({
    transactions: state.transaction.transactions,
    loading: state.transaction.loading
})
export default compose(
    connect(mapStateToProps, {getTransactions}),
    WithTranslation
)(RecentTransactions)
