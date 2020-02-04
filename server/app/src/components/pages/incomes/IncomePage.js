import React, {useState, useEffect} from 'react'
import PageLayout from '../../layout/PageLayout'
import Spinner from '../../layout/Spinner'
import {connect} from 'react-redux'
import {getIncomeByID} from '../../../actions'
import AddDeposit from './AddDeposit'
import DepositCard from './DepositCard'
import SingleIncomeAnalytics from '../analytics/SingleIncomeAnalytics'
import {Grid, Typography} from '@material-ui/core'

const IncomePage = props => {
    const id = props.match.params.incomeID
    const {getIncomeByID, incomes, loading} = props
    const [income, setIncome] = useState('')

    useEffect(() => {
        getIncomeByID(id)
            .then(res => setIncome(res[0]))
            .catch(error => console.log(error))
    }, [id, getIncomeByID, incomes])

    if(loading) {
        return  <PageLayout>
                    <Spinner/>
                </PageLayout>
    }

    return  <PageLayout>
                <Grid container>
                    <Grid item md={6} sm={12}>
                        <span style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Typography variant='h4'>{income.title}</Typography>
                            <Typography variant='h4'>{parseFloat(income.balance).toFixed(2)} {income.currency === 'RUB'?'₽':income.currency === 'EUR'?'€':'$'}</Typography>                         
                        </span>
                        <Typography variant='subtitle1'>{income.type}</Typography>
                        {income?<AddDeposit id={income._id} incomeCurrency={income.currency} incomeBalance={income.balance}/>:null}
                        <Grid container>
                            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column', padding:' 10px', alignItems: 'center'}}>
                                <Typography>Deposits</Typography>
                                <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', minWidth: '100%'}}>
                                    <Typography>Amount:</Typography>
                                    <Typography style={{paddingRight: '35px'}}>Date:</Typography>
                                </div>
                                {income && income.deposits ? income.deposits.map(deposit => (
                                    <DepositCard
                                        key={deposit._id}
                                        currency={deposit.currency}
                                        date={deposit.date}
                                        amount={deposit.amount}
                                    />
                                )):null}
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Expenses</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={12} style={{width: '100%'}}>
                        {income && income.deposits
                        ?<SingleIncomeAnalytics income={income}/>
                        :null}
                    </Grid>
                </Grid>
            </PageLayout>
}

const mapStateToProps = state => ({
    loading: state.finance.loading,
    incomes: state.finance.finance.incomes
})

export default connect(mapStateToProps, {getIncomeByID})(IncomePage)