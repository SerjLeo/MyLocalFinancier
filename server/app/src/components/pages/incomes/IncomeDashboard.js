import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { compose } from 'redux'

//Material-UI
import {getIncomes} from '../../../actions'
import AddIncomeForm from './incomeHelpers/AddIncomeForm';
import IncomeDashboardItem from './IncomeDashboardItem';
import Spinner from '../../layout/Spinner'
import SectionLayout from '../../layout/SectionLayout'
import WithTranslation from '../../translation/withTranslationHOC'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IncomeDashboardCard from "./IncomeDashboardCard";
import Divider from "@material-ui/core/Divider";

const IncomeDashboard = ({incomes, getIncomes, loading, strings}) => {
    const matches = useMediaQuery('(min-width:620px)');
    const isWide = useMediaQuery('(min-width:440px)');

    useEffect(() => {
        if(!incomes) getIncomes()
    },[])
    
    if (loading) {
        return <SectionLayout>
                <Spinner/>
            </SectionLayout>
    }

    return (incomes
        ?<SectionLayout title={strings.title} interfaceName={'incomeDashboard'} collapse={true} infoText={strings.infoText} addForm={AddIncomeForm}>
            <Divider style={{width: '100%', marginBottom: 20}}/>
            {matches
                ?<>
                    {incomes.length?incomes.map(income =>
                            <IncomeDashboardItem
                                title={income.title}
                                id={income._id}
                                icon={income.icon}
                                balance={income.balance}
                                currency={income.currency}
                                color={income.color}
                                key={income._id}
                                type='incomes'/>
                        ):<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <AddIncomeForm/>{strings.infoText}
                        </div>
                    }
                </>
            :<>
                {incomes.length?incomes.map(income =>
                    <IncomeDashboardCard
                        isWide={isWide}
                        income={income}
                        key={income._id}
                    />
                    ):<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <AddIncomeForm/>{strings.infoText}
                    </div>
                }
            </>
        }</SectionLayout>
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
