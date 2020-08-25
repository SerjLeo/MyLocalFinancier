import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from "redux";
import {Grid} from '@material-ui/core'
import Spinner from '../../layout/Spinner'
import {getCategories, getIncomes, getTransactions} from '../../../actions'
import PageLayout from '../../layout/PageLayout'
import CategoryDashboardCard from "./CategoryDashboardCard";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SectionLayout from "../../layout/SectionLayout";
import AddCategory from "./AddCategory";
import WithTranslation from "../../translation/withTranslationHOC";
import GlobalAnalytic from "../analytics/GlobalAnalytics";
import Divider from "@material-ui/core/Divider";

const CategoriesCatalog = ({
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

    if (categoryLoading || transactionLoading || incomeLoading) {
        return (
            <PageLayout>
                <Spinner/>
            </PageLayout>
        )
    }
    return (
        <PageLayout wrap={false}>
            <Grid container spacing={2}>
                {categories
                    ?<Grid item xs={12} sm={6}>
                        <SectionLayout title={strings.title} collapse interfaceName={'categoriesToolbar'} addForm={AddCategory}>
                            <Divider style={{width: '100%', marginBottom: 20}}/>
                            <Grid container alignContent='center'>
                                {categories.map(category =>(
                                    <CategoryDashboardCard
                                        isWide={isWide}
                                        id={category._id}
                                        key={category._id}
                                        title={category.title}
                                        icon={category.icon}
                                        color={category.color}
                                    />
                                ))}
                            </Grid>
                        </SectionLayout>
                    </Grid>
                    :null
                }
                <Grid item xs={12} sm={6}>
                    <SectionLayout title={strings.analytics} collapse interfaceName={'categoriesToolbar'}>
                        <Divider style={{width: '100%', marginBottom: 20}}/>
                        <GlobalAnalytic
                            type='category'
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

export default compose(
    connect(mapStateToProps, {getCategories, getIncomes, getTransactions}),
    WithTranslation
)(CategoriesCatalog)
