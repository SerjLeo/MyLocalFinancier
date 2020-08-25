import React, {useEffect, useState} from 'react'
import PageLayout from '../../layout/PageLayout'
import Spinner from '../../layout/Spinner'
import {connect} from 'react-redux'
import {
    getCategoryByID,
    getIncomes,
    getTransactionsByCategory
} from '../../../actions'
import {Grid, Typography, makeStyles} from '@material-ui/core'
import SectionLayout from "../../layout/SectionLayout";
import AddTransaction from "../Transactions/AddTransaction";
import Page404 from "../../Errors/Page404";
import Divider from "@material-ui/core/Divider";
import TransactionsList from "../Transactions/TransactionsList";
import getCategoriesIcon from "../../layout/Icons/categoriesIcons";
import GlobalAnalytic from "../analytics/GlobalAnalytics";
import WithTranslation from "../../translation/withTranslationHOC";
import {compose} from "redux";
import TypeAnalytics from "../analytics/TypeAnalytics";
import IncomeToolbar from "../incomes/incomePage/IncomeToolbar";
import CategoryToolbar from "./CategoryToolbar";
import {Redirect} from "react-router-dom";


const useStyles = makeStyles(theme =>({
    leftSide: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            paddingRight: 0
        },
        paddingRight: 10,
    },
    rightSide: {
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0
        },
        paddingLeft: 10
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center'
    },
    sectionContent: {
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        minWidth: '100%'
    },
    cardTitle: {
        display: "flex",
        alignItems: "center",
        textAlign: "center"
    },
    cardDescription: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'flex-end',
        textAlign: "center",
        paddingRight: '1rem'
    }
}))

const CategoryPage = ({
      match,
      strings,
      categoryLoading,
      getIncomes,
      transactionLoading,
      getTransactionsByCategory,
      incomeLoading,
      getCategoryByID,
      transactions,
      categories,
      category,
      incomes
  }) => {
    const id = match.params.categoryID
    const classes = useStyles()
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if (category && category._id === id) {
            return
        } else if (categories && categories.find(i => i._id === id)) {

            getCategoryByID(id, categories.find(i => i._id === id))
        } else {
            getCategoryByID(id)
        }

        if (!incomes) {
            getIncomes()
        }
        if (!transactions.transactions  || (transactions.category !== id)) {
            getTransactionsByCategory(id)
        }
    },[])

    if(categoryLoading || transactionLoading || incomeLoading) {
        return  <PageLayout style={{padding: 10}}>
            <Spinner/>
        </PageLayout>
    }

    if(redirect) {
        return <Redirect to="/dashboard"/>
    }

    const makeRedirect = () => setRedirect(true)
    const iconProps = {
        style: {
            fontSize: '50px',
            color: category?category.color:'white',
            margin: '10px 1rem 0 1rem'
        }
    }
    return category
        ?<PageLayout wrap={false}>
            <Grid container justify='center'>
                <Grid item md={6} sm={12} className={classes.leftSide}>
                    <SectionLayout
                        title={strings.title}
                        collapse
                        interfaceName={'categoryPage'}
                        toolbar={CategoryToolbar}
                        toolbarProps={{
                            id: category._id,
                            redirect: makeRedirect
                        }}
                    >
                        <Divider style={{width: '100%', marginBottom: 20}}/>
                        <Grid container justify='center' alignContent='center' style={{textAlign: 'center'}}>
                            <Grid item xs={5} className={classes.cardTitle}>
                                <Typography variant='subtitle1'>{getCategoriesIcon(category.icon)(iconProps)}</Typography>
                                <Typography variant='h4' style={{overflow: 'hidden',textOverflow: "ellipsis"}}>{category.title}</Typography>
                            </Grid>
                            <Grid item xs={7} className={classes.cardDescription}>
                                <Typography variant='h5'>{category.description}</Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{width: '100%', margin:'20px 0'}}/>
                        <AddTransaction fixedCategory={category}/>
                        <Divider style={{width: '100%', margin:'20px 0'}}/>
                        <TransactionsList
                            transactions={transactions.transactions}
                            incomes={incomes}
                            loading={transactionLoading}
                            incomeFilters
                        />
                    </SectionLayout>
                </Grid>
                <Grid item sm={6} xs={12} className={classes.rightSide}>
                    <SectionLayout interfaceName={'categoryAnalytics'} title={strings.analytics} collapse>
                    <Divider style={{width: '100%', marginBottom: 20}}/>
                    {transactions.transactions
                        ?<>
                            <GlobalAnalytic
                                singleCategory={category._id}
                                isWide={false}
                                categories={[]}
                                incomes={incomes}
                                transactions={transactions.transactions}
                                type="income"
                            />
                            <Divider style={{width: '100%', margin:'20px 0'}}/>
                            <TypeAnalytics
                                transactions={transactions.transactions}
                                categories={[]}
                                incomes={incomes}
                                showIncomeFilters
                                isWide={false}
                            />
                        </>
                        :<Spinner/>
                    }
                    </SectionLayout>
                </Grid>
            </Grid>
        </PageLayout>
        :<Page404/>
}

const mapStateToProps = state => ({
    categoryLoading: state.category.loading,
    incomes: state.income.incomes,
    incomeLoading: state.income.loading,
    category: state.category.activeCategory,
    categories: state.category.categories,
    transactions: state.transaction.transactionsByCategory,
    transactionLoading: state.transaction.transactionsByCategory_loading
})

export default compose(
    connect(mapStateToProps, {getCategoryByID, getIncomes, getTransactionsByCategory}),
    WithTranslation
)(CategoryPage)


