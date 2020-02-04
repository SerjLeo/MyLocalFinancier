import React from 'react'
import PropTypes from 'prop-types';
import AddCategory from './AddCategory';
import Info from '../../utils/Info';
import {connect} from 'react-redux';

//Material-UI

import {CustomPaper, PaperRow} from '../../Theme/Theming'
import DashboardListItem from '../../helpers/DashboardListItem'

const CategoriesDashboard = ({categories}) => {
    
    return (
        <CustomPaper style={{flexDirection: 'column', paddingBottom:'0'}}>
        <PaperRow>
            <span style={{margin:'5px'}}>Categories</span>
            <Info text={'Add categories to sort transactions'}/>
        </PaperRow>
        <PaperRow style={{justifyContent: 'flex-start', flexWrap:'wrap'}}>
            {categories?categories.map(category => 
            <DashboardListItem 
                name={category.title}
                icon={category.icon}
                balance={category.balance}
                color={category.color}
                key={category._id}
                id={category._id}
                type='categories'
            />):null}
            <AddCategory/>
        </PaperRow>            
        </CustomPaper>
    )
}

CategoriesDashboard.propTypes = {
    categories: PropTypes.array
}
const mapStateToProps = state => ({
    categories: state.finance.finance.categories
})

export default connect(mapStateToProps)(CategoriesDashboard);
