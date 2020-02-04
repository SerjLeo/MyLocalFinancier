import React, {useEffect} from 'react';

import Header from '../header';
import {
    LandingPage,
    Dashboard,
    Profile,
    CreateProfile,
    TransactionsList,
    IncomesToolbar,
    Analytics,
    CategoriesAnalytic,
    IncomePage,
    CategoriesToolbar
} from '../pages';
import {Login, Register, Confirm} from '../auth';
import {Alert} from '../Errors';

import {Route, Switch} from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import { loadUser} from '../../actions';
import PrivateRoute from '../routes/PrivateRoute'

import {CssBaseline, makeStyles} from '@material-ui/core';

import Background from './background.png';

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const useStyles = makeStyles({
    appContainer: {
        background: `url(${Background}) center center/cover no-repeat`,
        minHeight: '100vh'
    }
  });



const App = ({store}) => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, [store]);

    const styles = useStyles();
    
    return (
        <>
            <CssBaseline/>
            <div className={styles.appContainer}>
                <Header/>
                <Route exact path='/' component={LandingPage}/>
                <Route path='/confirm/:userID'  component={Confirm}/>
                <Switch>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/login' component={Login}/>
                    <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                    <PrivateRoute exact path='/profile' component={Profile}/>
                    <PrivateRoute exact path='/createprofile' component={CreateProfile}/>
                    <PrivateRoute exact path='/transactions' component={TransactionsList}/>
                    <PrivateRoute exact path='/incomes' component={IncomesToolbar}/>
                    <PrivateRoute exact path='/categories' component={CategoriesToolbar}/>
                    <PrivateRoute exact path='/incomes/:incomeID' component={IncomePage}/>
                    <PrivateRoute exact path='/analytics' component={Analytics}/>
                    <PrivateRoute exact path='/analytics/categories' component={CategoriesAnalytic}/>
                </Switch>
                <Alert/>
            </div>
        </>
    )
}

export default App;