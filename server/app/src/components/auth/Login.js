import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import {login} from '../../actions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Paper, makeStyles} from '@material-ui/core'
import Form from '../helpers/Form'

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.authFormContainer
}))

//MaterialUI components

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const classes = useStyles();

    const {email,password} = formData;

    const fields = [
      {
        name: 'email',
        type: 'textInput',
        inputType: 'email',
        value: email
      },
      {
        name: 'password',
        type: 'textInput',
        inputType: 'password',
        value: password
      }
    ]

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const onSubmit = async e => {
        e.preventDefault();
        login({email,password});
    }
    
    //Redirect if logged in

    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return <div className={classes.pageContainer}>
              <Container maxWidth='sm'>
                  <Paper>
                    <Form
                      onSubmit={onSubmit}
                      onChange={onChange}
                      type='login'
                      redirectTo='/register'
                      fields={fields}
                      direction='column'
                    />
                  </Paper>
              </Container>
          </div>
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated
})


export default connect(mapStateToProps, {login})(Login);
