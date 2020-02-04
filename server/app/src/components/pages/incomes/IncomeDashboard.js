import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//Material-UI

import {CustomPaper, PaperRow} from '../../Theme/Theming'
import AddIncome from './AddIncome';
import Info from '../../utils/Info'
import DashboardListItem from '../../helpers/DashboardListItem';

const IncomeDasboard = ({incomes}) => {    
    return (
        <CustomPaper style={{flexDirection: 'column', paddingBottom:'0'}}>
            <PaperRow>
                <span style={{margin:'5px'}}>Incomes</span>
                <Info text={'Add your incomes to be able manage money transactions'}/>
            </PaperRow>
            <PaperRow style={{justifyContent: 'flex-start', flexWrap:'wrap'}}>
                {incomes?incomes.map(income => 
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
                <AddIncome/>
            </PaperRow>
        </CustomPaper>
    )
}

IncomeDasboard.propTypes = {
    incomes: PropTypes.array
}

const mapStateToProps = state => ({
    incomes: state.finance.finance.incomes
})
export default connect(mapStateToProps)(IncomeDasboard)
