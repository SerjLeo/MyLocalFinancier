import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import PageLayout from '../../layout/PageLayout'
import {getCategories, getIncomes, getTransactions} from "../../../actions";
import TransactionsList from "./TransactionsList";
import SectionLayout from "../../layout/SectionLayout";

const AllTransactions = ({transactions, categories, incomes, loading, getTransactions, getIncomes, getCategories}) => {

    const[params, setParams] = useState({
        limit: 1000,
        skip: 0
    })

    const {skip, limit} = params

    useEffect(() => {
        if(!transactions) {
            getTransactions(limit,0)
        } else if(!incomes) {
            getIncomes()
        } else if(!categories) {
            getCategories()
        }
    })

    const loadMore = () => {
        let newSkip = skip?(skip + limit):transactions.length
        getTransactions(limit, newSkip)
        setParams({
            limit,
            skip: newSkip
        })
    }

    return (
        <PageLayout wrap={false}>
            <SectionLayout>
                <TransactionsList
                    handleClick={loadMore}
                    transactions={transactions}
                    categories={categories}
                    incomes={incomes}
                    loading={loading}
                    incomeFilters
                    categoryFilters
                />
            </SectionLayout>
        </PageLayout>
    )
}

AllTransactions.propTypes = {
    transactions: PropTypes.array,
    categories: PropTypes.array,
    incomes: PropTypes.array,
    loading: PropTypes.bool,
    getTransactions: PropTypes.func,
    getIncomes: PropTypes.func,
    getCategories: PropTypes.func
}
const mapStateToProps = (state) => ({
    transactions: state.transaction.transactions,
    loading: state.transaction.transactions_loading,
    categories: state.category.categories,
    incomes: state.income.incomes
})

export default connect(mapStateToProps, {getTransactions, getCategories, getIncomes})(AllTransactions)
