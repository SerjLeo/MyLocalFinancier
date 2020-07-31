import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import {login} from '../../actions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Form from '../helpers/Form'
import PageLayout from '../layout/PageLayout'


//MaterialUI components

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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

    return <PageLayout wrap={false} containerSize='sm' bgc='rgba(0,0,0,0.6)'>
              <Form
                onSubmit={onSubmit}
                onChange={onChange}
                type='login'
                redirectTo='/register'
                fields={fields}
                direction='column'
              />
          </PageLayout>
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

export default connect((state) => ({isAuthenticated:state.auth.isAuthenticated}), {login})(Login);
