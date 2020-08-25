import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import CustomLink from '../helpers/CustomLink';
import {logout, setLanguage} from '../../actions';
import PropTypes from 'prop-types';
import Menu from './Menu'
import LangChange from './LangChange'
import SettingsIcon from '@material-ui/icons/Settings'
import PersonIcon from '@material-ui/icons/Person'
import {LoginIcon, LogoutIcon} from '../layout/Icons/NavBar'

//MaterialUI components
import {AppBar, Toolbar, Typography, Grid, makeStyles} from '@material-ui/core';
import WithTranslation from "../translation/withTranslationHOC";

const useStyles = makeStyles(theme=>({
    menuItemText: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        marginRight: 10,
        paddingLeft: 5
    },
    menuItem: {
        marginRight: 10,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    leftPanel: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rightPanel: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        fontSize: '18px',
        [theme.breakpoints.up('xsm')]: {
            fontSize: '1.5625rem'
        }
    }
}))

const Header = ({strings, isAuthenticated, loading, logout, language, setLanguage}) => {
    const classes = useStyles();
    const handleLangChange = language => setLanguage(language);
    const userLinks = (
        <>
            <div className={classes.menuItem}>
                <LangChange selectedLanguage={language} onLangChange={handleLangChange}/>
            </div>
            <CustomLink className={classes.menuItem} to='/' onClick={() => {logout()}}>
                <LogoutIcon/>{' '}   
                <div className={classes.menuItemText}>{strings.logout}</div>
            </CustomLink>
        </>
    );

    const guestLinks = (
        <>  
            <div className={classes.menuItem}>
                <LangChange selectedLanguage={language} onLangChange={handleLangChange}/>
            </div>
            <CustomLink className={classes.menuItem} to='/register'>
                <PersonIcon/>{' '}   
                <div className={classes.menuItemText}>{strings.register}</div>
            </CustomLink>
            <CustomLink className={classes.menuItem} to='/login'>
                <LoginIcon/>{' '}
                <div className={classes.menuItemText}>{strings.login}</div>
            </CustomLink>
        </>
    );

    return (
        <AppBar position="absolute">
            <Toolbar>
                <Grid container direction='row' alignContent='center' alignItems='center'>
                    <Grid item xs={6} className={classes.leftPanel}>
                        {!loading && isAuthenticated &&<Menu/>}
                        <Typography variant="h4" className={classes.title}>
                            <CustomLink to="/">
                                MyLocalFinancier
                            </CustomLink>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.rightPanel}>
                        {!loading && (isAuthenticated?userLinks:guestLinks) }
                    </Grid> 
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    language: state.system.language
})
Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    logout: PropTypes.func.isRequired
}
export default compose(
    connect(mapStateToProps, {logout, setLanguage}),
    WithTranslation
)(Header);
