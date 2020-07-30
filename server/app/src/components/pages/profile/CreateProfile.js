import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../../layout/Spinner'
import {CustomLink} from '../../utils/CustomLink'
import Form from '../../helpers/Form'
import {setProfile, getProfile} from '../../../actions'
import PageLayout from '../../layout/PageLayout'

const EditProfile = ({profile:{profile, loading}, setProfile, getProfile, history}) => {
    const [formData, setFormData] = useState({
        name: profile?profile.name:'',
        location: profile?profile.location:'',
        phone: profile?profile.phone:'',
        language: profile?profile.language:'',
        mainCurrency: profile?profile.mainCurrency:'',
        currencyPairs: profile?profile.currencyPairs:[]
    });
    useEffect(()=>{
        if(!profile) {
            getProfile()
        }
        if(profile) {
            setFormData({
                name: profile.name,
                location: profile.location,
                phone:profile.phone,
                language: profile.language,
                mainCurrency: profile.mainCurrency
            })
        }
    }, [profile]);

    let edit = false;

    if (profile) {
        edit = true;
    }

    const {name,location,phone,language,mainCurrency,currencyPairs} = formData;

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
        },
        {
            value: language,
            name: 'language',
            type: 'select',
            menuItems: [
                {
                    _id: 'eng',
                    title: 'English',
                    value: 'eng'
                },
                {
                    _id: 'rus',
                    title: 'Русский',
                    value: 'rus'
                }
            ]
        },
        {
            value: mainCurrency,
            name: 'mainCurrency',
            type: 'select',
            menuItems: [
                {
                    _id: 'USD',
                    title: 'USD',
                    value: 'USD'
                },
                {
                    _id: 'RUB',
                    title: 'RUB',
                    value: 'RUB'
                },
                {
                    _id: 'EUR',
                    title: 'EUR',
                    value: 'EUR'
                }
            ]
        }
    ]
    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    
    const handleSubmit = e => {
        e.preventDefault();
        setProfile(formData, history, edit);
    }

    const goBack = () => {
        history.goBack();
    }

    if (loading) {
        return  <PageLayout>
                    <Spinner/>
                </PageLayout>
    }

    return <PageLayout wrap={false}>
                <Form
                    fields={fields}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    direction='column'
                    hasBackBtn={true}
                    goBack={goBack}
                    color = 'rgba(48,48,47,1)'
                    type='profile'
                />
            </PageLayout>
}

EditProfile.propTypes = {
    setProfile: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object
}
const mapStateToProps = (state) => ({
    profile : state.profile
})
export default connect(mapStateToProps, {setProfile, getProfile})(EditProfile);
