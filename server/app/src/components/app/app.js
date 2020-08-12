import React, {useEffect} from 'react';
//custom scrollbar
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Header from '../header';
import Footer from '../footer/Footer';
import {
    LandingPage,
    Dashboard,
    Settings,
    AllTransactions,
    IncomeCatalog,
    Analytics,
    CategoriesAnalytic,
    IncomePage,
    CategoryPage,
    CategoriesToolbar
} from '../pages';
import {Login, Register, Confirm} from '../auth';
import {Alert} from '../Errors';

import {Route, Switch} from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import {loadUser} from '../../actions';
import PrivateRoute from '../routes/PrivateRoute'
import {connect} from 'react-redux'
import {CssBaseline, makeStyles} from '@material-ui/core';

import Background from './background.jpg';

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const useStyles = makeStyles({
    appContainer: {
        background: `url(${Background}) no-repeat center center/cover fixed`,
        height: '100vh'
    }
  });

const App = ({loadUser}) => {

    useEffect(() => {
        loadUser();
    },[]);

    const styles = useStyles();
    
    return (
        <>
            <CssBaseline/>
            <div className={styles.appContainer}>
                <Header/>
                <SimpleBar style={{maxHeight: '100vh'}}>
                    <Route exact path='/' component={LandingPage}/>
                    <Route path='/confirm/:userID'  component={Confirm}/>
                    <Switch>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                        <PrivateRoute exact path='/settings' component={Settings}/>
                        <PrivateRoute exact path='/transactions' component={AllTransactions}/>
                        <PrivateRoute exact path='/incomes' component={IncomeCatalog}/>
                        <PrivateRoute exact path='/categories' component={CategoriesToolbar}/>
                        <PrivateRoute exact path='/incomes/:incomeID' component={IncomePage}/>
                        <PrivateRoute exact path='/categories/:categoryID' component={CategoryPage}/>
                        <PrivateRoute exact path='/analytics' component={Analytics}/>
                        <PrivateRoute exact path='/analytics/categories' component={CategoriesAnalytic}/>
                    </Switch>
                    <Footer/>
                    <Alert/>
                </SimpleBar>
            </div>
        </>
    )
}

export default connect(null, {loadUser})(App);
