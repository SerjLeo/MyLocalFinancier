import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../../layout/Spinner'
import {CustomLink} from '../../utils/CustomLink'
import Form from '../../helpers/Form'
import {changeProfile, getCurrentProfile} from '../../../actions'


//MaterialUi
import {Container, Paper, makeStyles, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.pageContainer,
    pageWrapper: theme.commonStyles.pageWrapper
}))

const EditProfile = ({profile:{profile, loading}, changeProfile, getCurrentProfile, history}) => {

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        phone: '',
        options: {
            language: '',
            mainCurrency: '',
            walletPairs: []
        }
    });
    
    const classes = useStyles();

    let edit = false;
    if (profile) {
        edit = true;
    }
    const {name,location,phone, options: {language, mainCurrency, walletPairs}} = formData;

    useEffect(()=>{
        getCurrentProfile();
        if(profile) {
            setFormData({
                name: profile.name,
                location: profile.location,
                phone:profile.phone,
                options: profile.options
            })
        }
    }, [getCurrentProfile, loading]);

    let fields = [
        {
            name: 'name',
            value: name,
            type: 'textInput',
            inputType: 'text'
        },
        {
            name: 'location',
            value: location,
            type: 'textInput',
            inputType: 'text'
        },
        {
            name: 'phone',
            value: phone,
            type: 'textInput',
            inputType: 'text'
        }
    ]
    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    
    const handleSubmit = e => {
        e.preventDefault();
        changeProfile(formData, history, edit);
    }

    if (loading) {
        return  <div className={classes.pageContainer}>
                    <Spinner/>
                </div>
    }

    return <div className={classes.pageContainer}>
                <Container maxWidth="lg">
                    <Paper className={classes.pageWrapper}>
                        <Form
                            fields={fields}
                            onSubmit={handleSubmit}
                            onChange={handleChange}
                            direction='column'
                            type='profile'
                        />
                        <CustomLink to='/profile'>
                            <Button>Back</Button>
                        </CustomLink>
                    </Paper>
                </Container>
            </div>
}

EditProfile.propTypes = {
    changeProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object
}
const mapStateToProps = (state) => ({
    profile : state.profile
})
export default connect(mapStateToProps, {changeProfile, getCurrentProfile})(withRouter(EditProfile));
