import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import AddCategory from './AddCategory';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {getCategories} from '../../../actions'
import Spinner from '../../layout/Spinner'
import SectionLayout from '../../layout/SectionLayout'
import WithTranslation from '../../translation/withTranslationHOC'
//Material-UI
import CategoryDashboardItem from './CategoryDashboardItem'
import CategoryDashboardCard from "./CategoryDashboardCard";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";

const CategoriesDashboard = ({categories, getCategories, loading, strings}) => {
    const matches = useMediaQuery('(min-width:620px)');
    const isWide = useMediaQuery('(min-width:440px)');

    useEffect(()=> {
        if(!categories) getCategories()
    },[])

    if (loading) {
        return <SectionLayout>
                    <Spinner/>
                </SectionLayout>
    }

    return (categories?
        <SectionLayout title={strings.title} interfaceName={'categoryDashboard'} collapse={true} infoText={strings.infoText} addForm={AddCategory}>
            <Divider style={{width: '100%', marginBottom: 20}}/>
            {matches
                ?<>
                    {categories.length?categories.slice(0).reverse().map(category =>
                        <CategoryDashboardItem
                            title={category.title}
                            id={category._id}
                            icon={category.icon}
                            color={category.color}
                            key={category._id}
                        />
                        ):<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <AddCategory/>{strings.infoText}
                        </div>
                    }
                </>
                :<>
                    {categories.length?categories.slice(0).reverse().map(category =>
                        <CategoryDashboardCard
                            isWide={isWide}
                            title={category.title}
                            id={category._id}
                            icon={category.icon}
                            color={category.color}
                            key={category._id}
                        />
                        ):<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <AddCategory/>{strings.infoText}
                        </div>
                    }
                </>
        }</SectionLayout>
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
