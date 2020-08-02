import React, {useState, useEffect} from 'react'
import Form from '../../../helpers/Form'
import {connect} from 'react-redux'
import {updateIncome, getRate, setAlert} from '../../../../actions'
import FinanceService from '../../../../services/FinanceService'

const AddDepositForm = ({income, addDeposit, exchangeRates, updateIncome, setAlert}) => {
    
    const [formData, setFormData] = useState({
        amount: 0,
        currency: income.currency || 'USD'
    })

    const {amount, currency} = formData
    const financeService = new FinanceService()
    
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const realAmount = Math.abs(parseFloat(amount))
        if(realAmount === 0) {
            return setAlert('Empty deposits not allowed', 'warning')
        }
        financeService.currencyConventer(
            income.currency,
            currency,
            realAmount,
            exchangeRates.EURrate,
            exchangeRates.USDrate
        )
        .then(res => {
            return res.value
        })
        .then(res => financeService.calcBalance(income.balance, res, true))
        .then(res => updateIncome(income._id, res))
        .catch(error=>console.log(error))
    }
    const fields = [
        {
            name: 'amount',
            value: amount,
            type: 'textInput',
            inputType: 'number'
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
        }
    ]
    return (
        <Form
            onChange={handleChange}
            onSubmit={handleSubmit}
            fields={fields}
            direction='row'
            type='deposit'
            title={false}
            color='inherit'
            elevation={0}
            breakpoints = {{
                xs: 6
            }}
        />
    )
}

export default connect(null, {updateIncome, setAlert})(AddDepositForm)
