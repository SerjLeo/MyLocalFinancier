import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import Spinner from '../../../layout/Spinner'
import {getCategories, getIncomes, getTransactions} from '../../../../actions'
import PageLayout from '../../../layout/PageLayout'

import useMediaQuery from "@material-ui/core/useMediaQuery";
import SectionLayout from "../../../layout/SectionLayout";
import AddIncomeForm from "../incomeHelpers/AddIncomeForm";
import IncomeDashboardCard from "../IncomeDashboardCard";
import WithTranslation from "../../../translation/withTranslationHOC";
import {compose} from "redux";
import GlobalAnalytic from "../../analytics/GlobalAnalytics";

const IncomeCatalog = ({
        strings,
        incomes,
        incomeLoading,
        categories,
        categoryLoading,
        transactions,
        transactionLoading,
        getCategories,
        getIncomes,
        getTransactions,
    }) => {
    const isWide = useMediaQuery('(min-width:440px) and (max-width:620px), (min-width:960px)')
    useEffect(() => {
        if (!categories) {
            getCategories()
        }
        if (!transactions) {
            getTransactions()
        }
        if(!incomes) {
            getIncomes()
        }
    }, [])

    if (incomeLoading || categoryLoading || transactionLoading) {
        return (
            <PageLayout>
                <Spinner/>
            </PageLayout>
        )
    }
    return (
        <PageLayout wrap={false}>
            <Grid container spacing={2}>
                {incomes
                    ?<Grid item xs={12} sm={6}>
                        <SectionLayout title={strings.title} collapse interfaceName={'incomesCatalog'} addForm={AddIncomeForm}>
                            <Grid container alignContent='center'>
                                {incomes.map(income =>(
                                    <IncomeDashboardCard
                                        isWide={isWide}
                                        income={income}
                                        key={income._id}
                                    />
                                ))}
                            </Grid>
                        </SectionLayout>
                    </Grid>
                    :null
                }
                <Grid item xs={12} sm={6}>
                    <SectionLayout title={strings.analytics} collapse interfaceName={'incomesAnalytics'}>
                        <GlobalAnalytic
                            type='income'
                            categories={categories}
                            transactions={transactions}
                            incomes={incomes}
                            isWide={false}
                        />
                    </SectionLayout>
                </Grid>
            </Grid>
        </PageLayout>
    )
}

const mapStateToProps = state => ({
    incomes: state.income.incomes,
    incomeLoading: state.income.loading,
    transactions: state.transaction.transactions,
    transactionLoading: state.transaction.transactions_loading,
    categories: state.category.categories,
    categoryLoading: state.category.loading
})

IncomeCatalog.propTypes = {
    getIncomes: PropTypes.func,
    incomes: PropTypes.array,
    loading: PropTypes.bool
}

export default compose(
    connect(mapStateToProps, {getCategories, getIncomes, getTransactions}),
    WithTranslation
)(IncomeCatalog)
