import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { compose } from 'redux'

//Material-UI
import {getIncomes} from '../../../actions'
import AddIncomeForm from './incomeHelpers/AddIncomeForm';
import Info from '../../helpers/Info'
import DashboardListItem from '../../helpers/DashboardListItem';
import Spinner from '../../layout/Spinner'
import SectionLayout from '../../layout/SectionLayout'
import WithTranslation from '../../translation/withTranslationHOC'

const IncomeDashboard = ({incomes, getIncomes, loading, strings}) => {   

    useEffect(() => {
        getIncomes()
    },[])
    
    if (loading) {
        return <SectionLayout>
                <Spinner/>
            </SectionLayout>
    }
    
    return (incomes
        ?<SectionLayout title={strings.title}>
            <Info text={strings.infoText}/>
            {incomes?incomes.slice(0).reverse().map(income => 
            <DashboardListItem 
                name={income.title}
                id={income._id}
                icon={income.icon}
                balance={income.balance}
                currency={income.currency}
                color={income.color}
                key={income._id}
                type='incomes'/>
            ):null}
            <AddIncomeForm/>
        </SectionLayout>
        :<Spinner/>
    )
}

IncomeDashboard.propTypes = {
    incomes: PropTypes.array,
    loading: PropTypes.bool
}

const mapStateToProps = state => ({
    incomes: state.income.incomes,
    loading: state.income.loading
})
export default compose(
    connect(mapStateToProps, {getIncomes}),
    WithTranslation
    )(IncomeDashboard)
