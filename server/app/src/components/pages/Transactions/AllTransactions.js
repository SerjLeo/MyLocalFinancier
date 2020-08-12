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
import {getCategories, getIncomes, getTransactions} from "../../../actions";
import Toolbar from "../../helpers/Toolbar";

const AllTransactions = ({transactions, categories, incomes, loading, strings, getTransactions, getIncomes, getCategories}) => {

    const[params, setParams] = useState({
        limit: 50,
        skip: 0
    })
    const[filters, setFilters] = useState({
        income: '',
        category: '',
        type: null,
        search: ''
    })
    const {skip, limit} = params
    useEffect( () => {
        if(!transactions.length) {
            getTransactions(limit,0)
        } else if(!incomes.length) {
            getIncomes()
        } else if(!categories.length) {
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

    const handleChange = e => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const filterTransactions = t => {
        if(filters.search && !t.title.toLowerCase().includes(filters.search)) return false
        if(filters.income && (t.income._id !== filters.income)) return false
        if(filters.category && (t.category._id !== filters.category)) return false
        if(filters.type && (t.type !== filters.type)) return false
        return true
    }


    if (transactions.length === 0 && !loading) {
        return (
            <PageLayout>
                <div>
                    No transactions yet...
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <Typography variant='h5'>{strings.title}</Typography>
            <Toolbar search categories={categories} incomes={incomes} filters={filters} onChange={handleChange}/>
            {transactions.filter(filterTransactions).map(transaction => {
                return <TransactionCard
                    key={transaction._id}
                    transaction={transaction}
                />
            })}
            {loading
                ?<Spinner/>
                :<Button fullWidth onClick={loadMore} style={{marginTop: 10}}>
                    {strings.loadMore}
                </Button>
            }
        </PageLayout>
    )
}

AllTransactions.propTypes = {
    expenses: PropTypes.array
}
const mapStateToProps = (state) => ({
    transactions: state.transaction.transactions,
    loading: state.transaction.loading,
    categories: state.category.categories,
    incomes: state.income.incomes
})

export default compose(
    connect(mapStateToProps, {getTransactions, getCategories, getIncomes}),
    WithTranslation
)(AllTransactions)
