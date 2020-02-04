import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addCategory} from '../../../actions'
import Form from '../../helpers/Form'
//Material-UI
import PopoverFabLayout from '../../layout/PopoverFabLayout';

const AddCategory = ({addCategory}) => {
    const [formData, setFormData] = React.useState({
        title: '',
        icon: '',
        color: '',
        description: ''
    });
    const {title, icon, color, description} = formData;

    const fields = [
        {
            value: title,
            name: 'title',
            type: 'textInput',
            inputType: 'text'
        },
        {
            value: icon,
            name: 'icon',
            type: 'iconSelect',
            menuItems: [
                {
                    value: 'fas fa-map-marked-alt fa-lg',
                    _id: 1
                },
                {
                    value: 'fas fa-pills fa-lg',
                    _id: 2
                },
                {
                    value: 'fas fa-shopping-cart fa-lg',
                    _id: 3
                },
                {
                    value: 'fas fa-file-invoice-dollar fa-lg',
                    _id: 4
                },
                {
                    value: 'fas fa-suitcase fa-lg',
                    _id: 5
                },
                {
                    value: 'fas fa-hand-holding-heart fa-lg',
                    _id: 6
                },
                {
                    value: 'fas fa-futbol fa-lg',
                    _id: 7
                },
                {
                    value: 'fas fa-cogs fa-lg',
                    _id: 8
                },
                {
                    value: 'fas fa-utensils fa-lg',
                    _id: 9
                },
                {
                    value: 'fas fa-laptop fa-lg',
                    _id: 10
                }
            ]
        },
        {
            value: color,
            name: 'color',
            type: 'colorSelect',
            menuItems: [
                {
                    value: '#208559',
                    _id: 1
                },
                {
                    value: '#87b337',
                    _id: 2
                },
                {
                    value: '#ad9e39',
                    _id: 3
                },
                {
                    value: '#ab8752',
                    _id: 4
                },
                {
                    value: '#8c7066',
                    _id: 5
                },
                {
                    value: '#2f398f',
                    _id: 6
                },
                {
                    value: '#4393b5',
                    _id: 7
                },
                {
                    value: '#23728c',
                    _id: 8
                },
                {
                    value: '#63308a',
                    _id: 9
                },
                {
                    value: '#8a2a91',
                    _id: 10
                },
                {
                    value: '#852048',
                    _id: 10
                }
            ]
        },
        {
            value: description,
            name: 'description',
            type: 'textInput',
            multiline: true,
            inputType: 'text'
        },
    ]

    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    
    const handleSubmit = async e => {
        e.preventDefault();
        addCategory(formData);
        setFormData({
            title: '',
            icon: '',
            color: '',
            description: ''
        });
    }


    return (
        <PopoverFabLayout buttonText='Add category' icon='fas fa-plus fa-lg'>
            <Form
                fields={fields}
                onChange={handleChange}
                onSubmit={handleSubmit}
                type='category'
                direction='column'
            />
        </PopoverFabLayout>
    )
}


AddCategory.propTypes = {
    addCategory: PropTypes.func.isRequired
}

export default connect(null, {addCategory})(AddCategory);
