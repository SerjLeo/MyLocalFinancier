import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CategoryCard from './CategoryCard'
import {Grid} from '@material-ui/core'
import Spinner from '../../layout/Spinner'
import {getCategories} from '../../../actions'
import PageLayout from '../../layout/PageLayout'


const CategoriesToolbar = ({categories, loading, getCategories}) => {

    if(categories.length === 0) {
        getCategories()
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
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Grid container alignContent='center'>
                        {categories.map(category =>(
                            <CategoryCard
                                id={category._id}
                                key={category._id}
                                title={category.title}
                                icon={category.icon}
                                color={category.color}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>Keks</Grid>
            </Grid>
            
        </PageLayout>
    )
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    loading: state.category.loading
})

CategoriesToolbar.propTypes = {

}

export default connect(mapStateToProps, {getCategories})(CategoriesToolbar)
