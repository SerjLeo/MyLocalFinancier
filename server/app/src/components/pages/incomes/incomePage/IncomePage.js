import React, {useState, useEffect} from 'react'
import PageLayout from '../../../layout/PageLayout'
import Spinner from '../../../layout/Spinner'
import {connect} from 'react-redux'
import {getIncomeByID, getRate, getCategories} from '../../../../actions'
import ExpenseCatalog from './ExpenseCatalog'
import DepositCatalog from './DepositCatalog'
import IncomeToolbar from './IncomeToolbar'
import IncomeTabs from './IncomeTabs'
import IncomeYearAnalytic from '../../analytics/SingleIncome/IncomeYearAnalytic'
import IncomeDailyAnalytic from '../../analytics/SingleIncome/IncomeDailyAnalytic'
import {Grid, Typography, makeStyles} from '@material-ui/core'


const useStyles = makeStyles(theme =>({
    leftSide: {
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
    }
}))
const IncomePage = props => {
    const id = props.match.params.incomeID
    const {
      getIncomeByID,
      getRate,
      categories,
      exchangeRates,
      income,
      getCategories,
      expenses,
      deposits,
      depositsLoading,
      incomeLoading,
      expenseLoading
    } = props

    const classes = useStyles()

    useEffect(() => {
        getIncomeByID(id)
        getCategories()
        getRate()
    },[])
    if(incomeLoading && expenseLoading && depositsLoading) {
        return  <PageLayout>
                    <Spinner/>
                </PageLayout>
    }
    return  <PageLayout>
                <Grid container justify='center'>
                    <Grid item md={6} sm={12} className={classes.leftSide}>
                        <span style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Typography variant='h4'>{income.title}</Typography>
                            <Typography variant='h4'>{income.balance} {income.currency === 'RUB'?'₽':income.currency === 'EUR'?'€':'$'}</Typography>
                        </span>
                        <span style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Typography variant='subtitle1'>{income.type}</Typography>
                            <IncomeToolbar id={id} />
                        </span>

                        {income && exchangeRates?<IncomeTabs exchangeRates={exchangeRates} income={income} categories={categories}/>:null}
                        <Grid container>
                            {depositsLoading
                                ?<Spinner/>
                                :<DepositCatalog deposits={deposits}/>
                            }
                            {expenseLoading
                                ?<Spinner/>
                                :<ExpenseCatalog expenses={expenses}/>
                            }
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={12} className={classes.rightSide}>
                      {expenseLoading && depositsLoading
                          ?<Spinner/>
                          :(((deposits && (deposits.length !== 0)) && (expenses && (expenses.length !== 0))))?
                            <>
                              <IncomeDailyAnalytic deposits={deposits} expenses={expenses} title='Daily analytic'/>
                              <IncomeYearAnalytic  deposits={deposits} expenses={expenses} title='Mounthly analytic'/>
                            </>:
                            null
                      }
                    </Grid>
                </Grid>
            </PageLayout>
}

const mapStateToProps = state => ({
    incomeLoading: state.income.loading,
    expenseLoading: state.expense.loading,
    depositsLoading: state.deposit.loading,
    income: state.income.activeIncome,
    categories: state.category.categories,
    exchangeRates: state.system.exchangeRate
})

export default connect(mapStateToProps, {getIncomeByID, getCategories, getRate})(IncomePage)
