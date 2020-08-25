import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux'

import {Button, Grid, Typography} from '@material-ui/core';
import WithTranslation from '../translation/withTranslationHOC'
import CustomLink from '../helpers/CustomLink'
import PageLayout from '../layout/PageLayout'

import {makeStyles} from "@material-ui/core/styles";

import bg from '../../public/images/main-page.png'
const useStyles = makeStyles(theme => ({
    gridItem: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            justifyContent: "flex-end"
        },
    },
    headTitle: {
      fontSize: '24px',
      margin: 20
    },
    image: {
        width: 800,
        height: 600,
      background: `url(${bg}) no-repeat center center/100% auto`,
        [theme.breakpoints.down('md')]: {
            height: 400,
            width: 600
        },
        [theme.breakpoints.down('sm')]: {
            height: 300,
            width: 480
        }
    },
    subTitle: {
      fontSize: '20px',
      marginBottom: 30
    },
    sidePanel: {
        width: '100%',
        height: 600,
        [theme.breakpoints.down('md')]: {
            height: 400
        },
        [theme.breakpoints.down('sm')]: {
            height: 300
        },
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))


const LandingPage = ({isAuthenticated, strings}) => {
    const classes = useStyles()
    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <PageLayout justify='center' wrap={false} bgc='rgba(0,0,0,0.6)'>
            <Grid container className={classes.container}>
                <Grid item lg={8} className={classes.sidePanel}>
                    <div className={classes.image}> </div>
                </Grid>
                <Grid item lg={4} className={classes.gridItem}>
                    <Typography variant="h1" className={classes.headTitle}>
                        {strings.welcomeText}
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
