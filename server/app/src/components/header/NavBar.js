import React from 'react';
import {connect} from 'react-redux';
import {CustomLink} from '../utils/CustomLink';
import {logout, setLanguage} from '../../actions';
import PropTypes from 'prop-types';
import Menu from './Menu'
import LangChange from './LangChange'
//MaterialUI components
import {AppBar, Toolbar, Typography, Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    menuItemText: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        marginRight: 10
    },
    menuItem: {
        marginRight: 10
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
                <i className="fas fa-user" />{' '}   
                <span className={classes.menuItemText}>Profile</span>
            </CustomLink>
            <CustomLink className={classes.menuItem} to='/' onClick={() => {logout()}}>
                <i className="fas fa-sign-out-alt"/>{' '}   
                <span className={classes.menuItemText}>Logout</span>
            </CustomLink>
        </>
    );

    const guestLinks = (
        <>  
            <div className={classes.menuItem}>
                <LangChange selectedLanguage={language} onLangChange={handleLangChange}/>
            </div>
            <CustomLink className={classes.menuItem} to='/register'>
                <i className="fas fa-user-plus"/>{' '}   
                <span className={classes.menuItemText}>Register</span>
            </CustomLink>
            <CustomLink className={classes.menuItem} to='/login'>
                <i className="fas fa-sign-in-alt"/>{' '}   
                <span className={classes.menuItemText}>Login</span>
            </CustomLink>
        </>
    );

    return (
        <AppBar position="fixed">
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
        language: state.profile.language
    }
}
Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    logout: PropTypes.func.isRequired
}
export default connect(mapStateToProps, {logout, setLanguage})(Header);