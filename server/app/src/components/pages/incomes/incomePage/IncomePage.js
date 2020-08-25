import React, {useEffect, useState} from 'react'
import PageLayout from '../../../layout/PageLayout'
import Spinner from '../../../layout/Spinner'
import {connect} from 'react-redux'
import {getIncomeByID, getCategories, getTransactionsByIncome, getIncomes} from '../../../../actions'
import IncomeToolbar from './IncomeToolbar'
import {Grid, Typography, makeStyles} from '@material-ui/core'
import SectionLayout from "../../../layout/SectionLayout";
import getIncomeIcon from "../../../layout/Icons/incomeIcons";
import AddTransaction from "../../Transactions/AddTransaction";
import Page404 from "../../../Errors/Page404";
import Divider from "@material-ui/core/Divider";
import TransactionsList from "../../Transactions/TransactionsList";
import WithTranslation from "../../../translation/withTranslationHOC";
import {compose} from "redux";
import GlobalAnalytic from "../../analytics/GlobalAnalytics";
import TypeAnalytics from "../../analytics/TypeAnalytics";
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
    cardBalance: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'flex-end',
        textAlign: "center",
        paddingRight: '1rem'
    },
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingRight: '1rem',
        textAlign: "start"
    }
}))


const IncomePage = ({
        match,
        strings,
        getIncomeByID,
        getCategories,
        getTransactionsByIncome,
        incomeLoading,
        transactionLoading,
        categoriesLoading,
        transactions,
        categories,
        incomes,
        getIncomes,
        income
    }) => {
    const id = match.params.incomeID
    const classes = useStyles()
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (income && income._id === id) {
            return
        } else if (incomes && incomes.find(i => i._id === id)) {
            getIncomeByID(id, incomes.find(i => i._id === id))
        } else {
            getIncomeByID(id)
        }

        if (!categories) {
            getCategories()
        }
        if (!incomes) {
            getIncomes()
        }
        if (!transactions.transactions  || (transactions.income !== id)) {
            getTransactionsByIncome(id)
        }
    },[])

    if(redirect) {
        return <Redirect to="/dashboard"/>
    }

    const makeRedirect = () => setRedirect(true)

    if(incomeLoading || transactionLoading || categoriesLoading) {
        return  <PageLayout style={{padding: 10}}>
                    <Spinner/>
                </PageLayout>
    }

    const iconProps = {
        style: {
            fontSize: '50px',
            color: income?income.color:'white',
            margin: '10px 1rem 0 1rem'
        }
    }

    return income
            ?<PageLayout wrap={false}>
                <Grid container justify='center' spacing={2}>
                    <Grid item sm={6} xs={12} className={classes.leftSide}>
                        <SectionLayout
                            title={strings.title}
                            collapse
                            interfaceName={'incomePage'}
                            toolbar={IncomeToolbar}
                            toolbarProps={{id: income._id, redirect: makeRedirect}}
                        >
                            <Divider style={{width: '100%', marginBottom: 20}}/>
                            <Grid container>
                                <Grid container justify='center' alignContent='center' style={{textAlign: 'center'}}>
                                    <Grid item xs={8} className={classes.cardTitle}>
                                        <Typography variant='subtitle1'>{getIncomeIcon(income.icon)(iconProps)}</Typography>
                                        <div className={classes.cardInfo}>
                                            <Typography variant='h4' style={{overflow: 'hidden',textOverflow: "ellipsis"}}>
                                                {income.title}
                                            </Typography>
                                            <Typography variant='subtitle1'>
                                                {income.type}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} className={classes.cardBalance}>
                                        <Typography variant='h4'>
                                            {income.balance}
                                            {income.currency === 'RUB'?'₽':income.currency === 'EUR'?'€':'$'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider style={{width: '100%', margin:'20px 0'}}/>
                            <AddTransaction fixedIncome={income}/>
                            <Divider style={{width: '100%', margin:'20px 0'}}/>
                            <TransactionsList
                                transactions={transactions.transactions}
                                categories={categories}
                                incomes={incomes}
                                loading={transactionLoading}
                                categoryFilters
                            />
                        </SectionLayout>
                    </Grid>
                    <Grid item sm={6} xs={12} className={classes.rightSide}>
                        <SectionLayout interfaceName={'incomeAnalytics'} title={strings.analytics} collapse>
                            <Divider style={{width: '100%', marginBottom: 20}}/>
                            {transactions.transactions
                                ?<>
                                    <GlobalAnalytic
                                        singleIncome={income._id}
                                        isWide={false}
                                        categories={categories}
                                        incomes={[]}
                                        transactions={transactions.transactions}
                                        singleCurrency={income.currency}
                                        type="category"
                                    />
                                    <Divider style={{width: '100%', margin:'20px 0'}}/>
                                    <TypeAnalytics
                                        transactions={transactions.transactions}
                                        categories={categories}
                                        singleCurrency={income.currency}
                                        incomes={[]}
                                        showCategoryFilters
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
    incomeLoading: state.income.loading,
    incomes: state.income.incomes,
    income: state.income.activeIncome,
    categories: state.category.categories,
    categoriesLoading: state.category.loading,
    transactions: state.transaction.transactionsByIncome,
    transactionLoading: state.transaction.transactionsByIncome_loading
})

export default compose(
    connect(mapStateToProps, {getIncomeByID, getIncomes, getCategories, getTransactionsByIncome}),
    WithTranslation
)(IncomePage)
