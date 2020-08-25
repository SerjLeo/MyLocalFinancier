import React, {useEffect} from 'react';
import SectionLayout from "../../layout/SectionLayout";
import PageLayout from "../../layout/PageLayout";
import {connect} from "react-redux";
import {getCategories, getIncomes, getTransactions} from "../../../actions";
import Spinner from "../../layout/Spinner";
import GlobalAnalytics from "./GlobalAnalytics";
import TypeAnalytics from "./TypeAnalytics";
import Divider from "@material-ui/core/Divider";

const AnalyticsPage = ({
        typeAnalytics = false,
        globalAnalytics = false,
        showCategoryFilters = false,
        showIncomeFilters = false,
        incomes,
        incomeLoading,
        categories,
        categoryLoading,
        transactions,
        transactionLoading,
        getCategories,
        getIncomes,
        getTransactions,
        type = 'income'
    }) => {

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

    return (
        (transactionLoading || categoryLoading || incomeLoading)
            ?<PageLayout wrap={false}>
                <SectionLayout>
                    <Spinner/>
                </SectionLayout>
            </PageLayout>
            :<div>
                <PageLayout wrap={false}>
                    <SectionLayout>
                        {globalAnalytics
                            ?<GlobalAnalytics
                                transactions={transactions}
                                categories={categories}
                                incomes={incomes}
                                type={type}
                                showCategoryFilters={showCategoryFilters}
                                showIncomeFilters={showIncomeFilters}
                            />
                            :null
                        }
                        {typeAnalytics&&globalAnalytics?<Divider style={{width: '100%', margin:'20px 0'}}/>:null}
                        {typeAnalytics
                            ?<TypeAnalytics
                                transactions={transactions}
                                categories={categories}
                                incomes={incomes}
                                showCategoryFilters={showCategoryFilters}
                                showIncomeFilters={showIncomeFilters}
                            />
                            :null
                        }

                    </SectionLayout>
                </PageLayout>
            </div>
    );
};

const mapStateToProps = state => ({
    incomes: state.income.incomes,
    incomeLoading: state.income.loading,
    transactions: state.transaction.transactions,
    transactionLoading: state.transaction.transactions_loading,
    categories: state.category.categories,
    categoryLoading: state.category.loading
})

export default connect(mapStateToProps, {getCategories, getIncomes, getTransactions})(AnalyticsPage)
