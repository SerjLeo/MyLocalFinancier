import React, {useState, useEffect} from 'react'
import Form from '../../helpers/Form'
import {connect} from 'react-redux'
import {updateIncome, getRate, setAlert} from '../../../actions'
import FinanceService from '../../../services/financeService'

const AddDeposit = ({id, incomeBalance, incomeCurrency, exchangeRates, updateIncome,setAlert, getRate}) => {
    const [formData, setFormData] = useState({
            amount: 0,
            currency: incomeCurrency
    })
    
    useEffect(() =>{
        getRate()
        setFormData({
            amount: 0,
            currency: incomeCurrency
        })
    },[incomeCurrency])

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
        if(amount === 0) {
            return setAlert('Empty deposits not allowed', 'warning')
        }
        financeService.currencyConventer(
            incomeCurrency,
            currency,
            amount,
            exchangeRates.EURrate,
            exchangeRates.USDrate
        )
        .then(res => {
            let newBalance = incomeBalance + parseFloat(res.value);

            updateIncome(
                id,
                newBalance,
                {
                    amount,
                    currency,
                    exchangeRate: res.rate
                })
        })
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
        color='inherit'
        elevation={0}
        breakpoints = {{
            xs: 6
        }}
        />
    )
}

const mapStateToProps = state => ({
    exchangeRates: state.finance.exchangeRate
})

export default connect(mapStateToProps, {updateIncome, setAlert, getRate})(AddDeposit)