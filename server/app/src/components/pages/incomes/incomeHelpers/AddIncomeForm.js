import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addIncome} from '../../../../actions'
import Form from '../../../helpers/Form'
import AddIcon from '@material-ui/icons/Add';
import PopoverButtonLayout from '../../../layout/PopoverButtonLayout'

const AddIncomeForm = ({addIncome}) => {
    const [formData, setFormData] = React.useState({
        title: '',
        type: '',
        balance: 0,
        color:'',
        icon:'',
        currency: 'RUB'
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
                    _id: 11
                },
                {
                    value: 'Cash',
                    title: 'Cash',
                    _id: 22
                },
                {
                    value: 'Bank Account',
                    title: 'Bank Account',
                    _id: 33
                },
                {
                    value: 'Web Wallet',
                    title: 'Web Wallet',
                    _id: 44
                },
                {
                    value: 'Crypto',
                    title: 'Cryptocurrency',
                    _id: 55
                },
                {
                    value: 'Other',
                    title: 'Other',
                    _id: 66
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
                        color: '#c4c93d',
                        icon: 'credit-card'
                    })
                } else if (e.target.value === 'Cash') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#6fa044',
                        icon: 'money-bill'
                    })
                } else if (e.target.value === 'Web Wallet') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#496cbc',
                        icon: 'wallet'
                    })
                } else if (e.target.value === 'Bank Account') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#54d999',
                        icon: 'bank-account'
                    })
                } else if (e.target.value === 'Crypto') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#ddb256',
                        icon: 'bitcoin'
                    })
                } else if (e.target.value === 'Other') {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        color: '#2ea4bc',
                        icon: 'coins'
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
        addIncome({
            ...formData,
            balance: Number(balance)
        });
        setFormData({
            title: '',
            type: '',
            balance: 0,
            color:'',
            icon:'',
            currency: 'RUB'
        });
    }

    return  <PopoverButtonLayout icon={AddIcon}>
                <Form
                    fields={fields}
                    type='income'
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    direction='column'
                />
            </PopoverButtonLayout>
}

AddIncomeForm.propTypes = {
    addIncome: PropTypes.func
}

export default connect(null, {addIncome})(AddIncomeForm);
