import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert, register} from '../../actions';
import PropTypes from 'prop-types';
import {Container, Paper, makeStyles} from '@material-ui/core'
import Form from '../helpers/Form'

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.authFormContainer
}))

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_2: ''
    });
    const classes = useStyles();
    const {name,email,password,password_2} = formData;
    const fields = [
        {
            name: 'name',
            type: 'textInput',
            inputType: 'name',
            value: name
        },
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
            value: password,
            helperText: 'Minimum 6 characters'
        },
        {
            name: 'password_2',
            type: 'textInput',
            inputType: 'password',
            value: password_2
        }
    ]

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password_2) {
            setAlert('Passwords dont match', 'danger', 2000);
        } else {
            register({name, email, password});
        }
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return <div className={classes.pageContainer}>
                <Container maxWidth='sm'>
                    <Paper>
                        <Form
                            onSubmit={onSubmit}
                            onChange={onChange}
                            type='register'
                            redirectTo='/login'
                            fields={fields}
                            direction='column'
                        />
                    </Paper>
                </Container>
            </div>
    

}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
