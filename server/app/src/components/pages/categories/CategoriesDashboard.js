import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import AddCategory from './AddCategory';
import Info from '../../helpers/Info'
import {connect} from 'react-redux';
import { compose } from 'redux'
import {getCategories} from '../../../actions'
import Spinner from '../../layout/Spinner'
import SectionLayout from '../../layout/SectionLayout'
import WithTranslation from '../../translation/withTranslationHOC'
//Material-UI
import DashboardListItem from '../../helpers/DashboardListItem'

const CategoriesDashboard = ({categories, getCategories, loading, strings}) => {
    
    useEffect(()=>{
        getCategories()
    },[])

    if (loading) {
        return <SectionLayout>
                    <Spinner/>
                </SectionLayout>
    }

    return (categories?
        <SectionLayout title={strings.title}>
            <Info text={strings.infoText}/>
            {categories?categories.slice(0).reverse().map(category => 
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
        </SectionLayout>
        :<Spinner/>
    )
}

CategoriesDashboard.propTypes = {
    categories: PropTypes.array,
    loading: PropTypes.bool
}
const mapStateToProps = state => ({
    categories: state.category.categories,
    loading: state.category.loading
})

export default compose(
    connect(mapStateToProps, {getCategories}),
    WithTranslation
    )(CategoriesDashboard);
