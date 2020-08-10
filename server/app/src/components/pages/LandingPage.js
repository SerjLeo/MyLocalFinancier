import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux'

import {Button, Grid, Typography} from '@material-ui/core';
import WithTranslation from '../translation/withTranslationHOC'
import CustomLink from '../helpers/CustomLink'
import PageLayout from '../layout/PageLayout'

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    gridItem: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    headTitle: {
      fontSize: '24px',
      margin: 40
    },
    subTitle: {
      fontSize: '20px',
      marginBottom: 30
    },
    sidePanel: {
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}))


const LandingPage = ({isAuthenticated, strings}) => {
    const classes = useStyles()
    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <PageLayout wrap={false} bgc='rgba(0,0,0,0.6)'>
            <Grid container>
                <Grid item md={7} className={classes.gridItem}>
                    <Typography variant="h1" className={classes.headTitle}>
                        {strings.welcomeText}
                    </Typography>
                    <Typography variant="h3" className={classes.subTitle}>
                        Some subtext
                    </Typography>
                    <div>
                        <CustomLink to='/login' style={{width: '100%'}}>
                            <Button variant="contained" style={{margin: 10}} color="primary" disableElevation>{strings.loginBtn}</Button>
                        </CustomLink>
                        <CustomLink to='/register'>
                            <Button  style={{margin: 10}} variant="contained" color="primary" disableElevation>{strings.registerBtn}</Button>
                        </CustomLink>
                    </div>
                </Grid>
                <Grid item md={5} className={classes.sidePanel}>
                    item_2
                </Grid>
            </Grid>
        </PageLayout>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    // language: state.profile.language
})
export default compose(
                    connect(mapStateToProps),
                    WithTranslation
                )(LandingPage);
