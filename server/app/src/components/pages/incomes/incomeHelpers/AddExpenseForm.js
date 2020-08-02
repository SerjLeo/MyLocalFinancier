import React, {useState, useEffect} from 'react'
import Form from '../../../helpers/Form'
import {connect} from 'react-redux'
import {updateIncome, setAlert} from '../../../../actions'
import FinanceService from '../../../../services/FinanceService'

const AddExpenseForm = ({income, categories, exchangeRates, updateIncome, setAlert}) => {
    
    const [formData, setFormData] = useState({
        title: '',
        amount: 0,
        category:'',
        currency: income.currency
    })

    const {amount, currency, title, category} = formData
    const {USDrate, EURrate} = exchangeRates
    const financeService = new FinanceService()
    
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const realAmount = Math.abs(parseFloat(amount))
            const newAmount = await financeService.currencyConventer(income.currency, currency, realAmount, EURrate, USDrate);
            const newBalance = await financeService.calcBalance(income.balance, newAmount.value, false);
            
            const newExpence = {
                title: title,
                income: {
                  _id: income._id,
                  currency: income.currency,
                  title: income.title
                },
                icon: category.icon,
                category: {
                  _id:category._id,
                  title: category.title
                },
                amount: newAmount.value,
                currency: currency,
                exchangeRate: newAmount.rate
            }

            await updateIncome(income._id, newBalance);
        }
        
        catch(err) {
            setAlert(err, 'warning')
        }
    }
    const fields = [
        {
            name: 'title',
            type: 'textInput',
            value: title
        },
        {
            name: 'amount',
            type: 'textInput',
            inputType: 'number',
            value: amount
        },
        {
            name: 'currency',
            type: 'select',
            menuItems:[
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
            ],
            value: currency
        },
        {
            name: 'category',
            type: 'select',
            value: category,
            menuItems: categories
        }
    ]
    return (
        <Form
        onChange={handleChange}
        onSubmit={handleSubmit}
        fields={fields}
        direction='row'
        type='expense'
        color='inherit'
        elevation={0}
        title={false}
        breakpoints = {{
            xs: 6
        }}
        />
    )
}


export default connect(null, {updateIncome, setAlert})(AddExpenseForm)
