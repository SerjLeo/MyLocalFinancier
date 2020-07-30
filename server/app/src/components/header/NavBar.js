import React from 'react';
import {connect} from 'react-redux';
import CustomLink from '../helpers/CustomLink';
import {logout, setLanguage} from '../../actions';
import PropTypes from 'prop-types';
import Menu from './Menu'
import LangChange from './LangChange'
import PersonIcon from '@material-ui/icons/Person';
import {LoginIcon, LogoutIcon} from '../layout/Icons/NavBar'
//MaterialUI components
import {AppBar, Toolbar, Typography, Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    menuItemText: {
        [theme.breakpoints.down('xs')]: {
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
    }
}))

const Header = ({isAuthenticated, loading, logout, language, setLanguage}) => {
    const classes = useStyles();
    const handleLangChange = language => setLanguage(language);
    const userLinks = (
        <>
            <CustomLink className={classes.menuItem} to='/profile'>
                <PersonIcon/>{' '}
                <div className={classes.menuItemText}>Profile</div>
            </CustomLink>
            <CustomLink className={classes.menuItem} to='/' onClick={() => {logout()}}>
                <LogoutIcon/>{' '}   
                <div className={classes.menuItemText}>Logout</div>
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
                <div className={classes.menuItemText}>Register</div>
            </CustomLink>
            <CustomLink className={classes.menuItem} to='/login'>
                <LoginIcon/>{' '}
                <div className={classes.menuItemText}>Login</div>
            </CustomLink>
        </>
    );

    return (
        <AppBar position="fixed" style={{height: '8vh'}}>
            <Toolbar>
                <Grid container direction='row' alignContent='center' alignItems='center'>
                    <Grid item xs={6} className={classes.leftPanel}>
                        {!loading && isAuthenticated &&<Menu/>}
                        <Typography variant="h4">
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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading,
        language: state.system.language
    }
}
Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    logout: PropTypes.func.isRequired
}
export default connect(mapStateToProps, {logout, setLanguage})(Header);