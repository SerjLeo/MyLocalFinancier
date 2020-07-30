import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addCategory} from '../../../actions'
import Form from '../../helpers/Form'
import AddIcon from '@material-ui/icons/Add';
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
                    value: 'pharmacy',
                    _id: 'i_1'
                },
                {
                    value: 'shopping-cart',
                    _id: 'i_2'
                },
                {
                    value: 'travel',
                    _id: 'i_3'
                },
                {
                    value: 'bill',
                    _id: 'i_4'
                },
                {
                    value: 'suitcase',
                    _id: 'i_5'
                },
                {
                    value: 'paw',
                    _id: 'i_6'
                },
                {
                    value: 'coffee',
                    _id: 'i_7'
                },
                {
                    value: 'laptop',
                    _id: 'i_8'
                },
                {
                    value: 'food',
                    _id: 'i_9'
                },
                {
                    value: 'sports',
                    _id: 'i_10'
                },
                {
                    value: 'gear',
                    _id: 'i_11'
                },
                {
                    value: 'pencil',
                    _id: 'i_12'
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
                    _id: 11
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
        <PopoverFabLayout buttonText='Add category' icon={AddIcon}>
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
