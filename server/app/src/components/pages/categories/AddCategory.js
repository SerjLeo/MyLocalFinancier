import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addCategory} from '../../../actions'
import Form from '../../helpers/Form'
import AddIcon from '@material-ui/icons/Add';
//Material-UI
import PopoverButtonLayout from '../../layout/PopoverButtonLayout';

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
                    value: '#af393f',
                    _id: 16
                },
                {
                    value: '#ff6262',
                    _id: 1
                },
                {
                    value: '#f09061',
                    _id: 2
                },
                {
                    value: '#ecb153',
                    _id: 3
                },
                {
                    value: '#ab8752',
                    _id: 4
                },
                {
                    value: '#ccec76',
                    _id: 5
                },
                {
                    value: '#95df64',
                    _id: 6
                },
                {
                    value: '#6ad688',
                    _id: 7
                },
                {
                    value: '#74907f',
                    _id: 8
                },
                {
                    value: '#6ddebf',
                    _id: 9
                },
                {
                    value: '#6dc7de',
                    _id: 10
                },
                {
                    value: '#6d8fde',
                    _id: 11
                },
                {
                    value: '#726dde',
                    _id: 12
                },
                {
                    value: '#c26dde',
                    _id: 13
                },
                {
                    value: '#e784be',
                    _id: 14
                },
                {
                    value: '#976dde',
                    _id: 15
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
        <PopoverButtonLayout icon={AddIcon}>
            <Form
                fields={fields}
                onChange={handleChange}
                onSubmit={handleSubmit}
                type='category'
                direction='column'
            />
        </PopoverButtonLayout>
    )
}


AddCategory.propTypes = {
    addCategory: PropTypes.func.isRequired
}

export default connect(null, {addCategory})(AddCategory);
