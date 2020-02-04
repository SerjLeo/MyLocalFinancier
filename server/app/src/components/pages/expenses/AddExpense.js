import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import FinanceService from '../../../services/financeService';
import {updateCategory, getCurrentFinance, updateIncome, addExpense, setAlert} from '../../../actions'

import {CustomPaper} from '../../Theme/Theming'
import Form from '../../helpers/Form'

const AddExpense = ({categories, incomes, rates, addExpense, setAlert, getCurrentFinance, updateCategory, updateIncome}) => {
    const finService = new FinanceService();

    const {USDrate, EURrate} = rates;
    
    const [formData, setFormData] = React.useState({
        title: '',
        amount: 0,
        income: '',
        category: '',
        currency: 'RUB'
    });
    const {title, amount, income, category, currency} = formData;
    
    const fields = [
        {
            name: 'title',
            type: 'textInput',
            value: title
        },
        {
            name: 'income',
            type: 'select',
            value: income,
            menuItems: incomes
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

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const newAmount = await finService.currencyConventer(income.currency, currency, amount, EURrate, USDrate);
            const newBalance = await finService.calcIncomeChange(income.balance, newAmount.value);
            

            const res = await addExpense({
                title: title,
                income: {_id: income._id, currency: income.currency, title: income.title},
                category: {_id:category._id, title: category.title},
                amount: amount,
                currency: currency,
                exchangeRate: newAmount.rate
            });
            
            await updateCategory(res.data._id, category._id);
            await updateIncome(newBalance,res.data._id,income._id);
            getCurrentFinance();
        }
        
        catch(err) {
            setAlert('Not enough money on this income', 'warning')
        }
        
        setFormData({
            title: '',
            amount: 0,
            income: '',
            category: '',
            currency: 'RUB'
        });
    }
    return <Form 
                onSubmit={handleSubmit}
                onChange={handleChange}
                type='expense'
                direction='row'
                color='#424242'
                fields={fields}
                breakpoints={{
                    sm: 12,
                    xs: 12,
                    md: 2
                }}
            ></Form>           
}

AddExpense.propTypes = {
    categories: PropTypes.array
}
const mapStateToProps = state => ({
    categories: state.finance.finance.categories,
    incomes: state.finance.finance.incomes,
    rates: state.finance.exchangeRate
})
export default connect(mapStateToProps,{updateCategory, updateIncome, addExpense, setAlert, getCurrentFinance})(AddExpense);
