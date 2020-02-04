import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addIncome} from '../../../actions'
import Form from '../../helpers/Form'
import PopoverFabLayout from '../../layout/PopoverFabLayout'

const AddIncome = ({options, addIncome}) => {
    const [formData, setFormData] = React.useState({
        title: '',
        type: '',
        balance: 0,
        color:'',
        icon:'',
        currency: (options?options.mainCurrency:'USD')
    });
    const {title, type, balance, currency} = formData;
    
    const fields = [
        {
            value: title,
            name: 'title',
            type: 'textInput',
            inputType: 'text'
        },
        {
            value: type,
            name: 'type',
            type: 'select',
            menuItems: [
                {
                    value: 'Card',
                    title: 'Card',
                    _id: 1
                },
                {
                    value: 'Cash',
                    title: 'Cash',
                    _id: 2
                },
                {
                    value: 'Bank Account',
                    title: 'Bank Account',
                    _id: 3
                },
                {
                    value: 'Web Wallet',
                    title: 'Web Wallet',
                    _id: 4
                },
                {
                    value: 'Crypto',
                    title: 'Cryptocurrency',
                    _id: 5
                },
                {
                    value: 'Other',
                    title: 'Other',
                    _id: 5
                }
            ]
        },
        {
            value: currency,
            name: 'currency',
            type: 'select',
            menuItems: [
                {
                    value: 'RUB',
                    title: 'RUB',
                    _id: 1
                },
                {
                    value: 'USD',
                    title: 'USD',
                    _id: 2
                },
                {
                    value: 'EUR',
                    title: 'EUR',
                    _id: 3
                }
            ]
        },
        {
            name: 'balance',
            value: balance,
            type: 'textInput',
            inputType: 'number'
        }
    ]
    
    const handleChange = e => {
        if (e.target.name === 'type') {
            if (e.target.value === 'Card') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#2f398f',
                        icon: 'far fa-credit-card fa-lg'
                    })
                } else if (e.target.value === 'Cash') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#208559',
                        icon: 'fas fa-money-bill fa-lg'
                    })
                } else if (e.target.value === 'Web Wallet') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#20c2e3',
                        icon: 'fas fa-wallet fa-lg'
                    })
                } else if (e.target.value === 'Bank Account') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#621bb3',
                        icon: 'fas fa-coins fa-lg'
                    })
                } else if (e.target.value === 'Crypto') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#2f398f',
                        icon: 'fab fa-bitcoin fa-lg'
                    })
                } else if (e.target.value === 'Other') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#8c7066',
                        icon: 'fas fa-money-check-alt fa-lg'
                    })
                };
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        addIncome(formData);
        setFormData({
            title: '',
            type: '',
            balance: 0,
            color:'',
            icon:'',
            currency: (options?options.mainCurrency:'USD')
        });
    }

    return  <PopoverFabLayout buttonText='Add income' icon='fas fa-plus fa-lg'>
                <Form
                    fields={fields}
                    type='income'
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    direction='column'
                />
            </PopoverFabLayout>
}

const mapStateToProps = state => ({
    options: state.profile.options
})

AddIncome.propTypes = {
    AddIncome: PropTypes.func
}

export default connect(mapStateToProps, {addIncome})(AddIncome);