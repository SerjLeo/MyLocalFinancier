import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import IncomeCard from './IncomeCard'
import {Grid} from '@material-ui/core'
import Spinner from '../../layout/Spinner'
import {getIncomes} from '../../../actions'
import PageLayout from '../../layout/PageLayout'


const IncomesToolbar = ({incomes, loading, getIncomes}) => {

    if(incomes.length === 0) {
        getIncomes()
    }

    if (loading) {
        return (
            <PageLayout>
                <Spinner/>
            </PageLayout>
        )
    }
    return (
        <PageLayout>
            <Grid container alignContent='center'>
                <Grid item xs={6}>
                    <Grid container>
                        {incomes.map(income =>(
                            <IncomeCard
                                id={income._id}
                                key={income._id}
                                type={income.type}
                                balance={income.balance}
                                currency={income.currency}
                                icon={income.icon}
                                color={income.color}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    Fnflytics
                </Grid>
            </Grid>
        </PageLayout>
    )
}

const mapStateToProps = state => ({
    incomes: state.finance.finance.incomes,
    loading: state.finance.loading
})

IncomesToolbar.propTypes = {
    getIncomes: PropTypes.func,
    incomes: PropTypes.array,
    loading: PropTypes.bool
}

export default connect(mapStateToProps, {getIncomes})(IncomesToolbar)