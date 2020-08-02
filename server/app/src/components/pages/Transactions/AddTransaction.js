import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from 'redux'
import FinanceService from '../../../services/FinanceService';
import {updateIncome, addExpense, setAlert} from '../../../actions'

import Form from '../../helpers/Form'
import SectionLayout from '../../layout/SectionLayout';
import WithTranslation from '../../translation/withTranslationHOC';

const AddTransaction = ({categories, incomes, rates, addExpense, strings, setAlert, updateIncome}) => {
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
            const realAmount = Math.abs(parseFloat(amount))
            const newAmount = await finService.currencyConventer(income.currency, currency, realAmount, EURrate, USDrate);
            const newBalance = await finService.calcBalance(income.balance, newAmount.value, false);

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

            await addExpense(newExpence);
            await updateIncome(income._id, newBalance);
        }

        catch(err) {
            setAlert(err, 'warning')
        }

        // setFormData({
        //     title: '',
        //     amount: 0,
        //     income: '',
        //     category: '',
        //     currency: 'RUB'
        // });
    }
    return incomes && incomes.length !== 0 && categories && categories.length !== 0
        ?<SectionLayout title={strings.title}>
            <Form
                onSubmit={handleSubmit}
                onChange={handleChange}
                type='expense'
                showTitle={false}
                direction='row'
                elevation={0}
                color='transparent'
                fields={fields}
                breakpoints={{
                    sm: 12,
                    xs: 12,
                    md: 2
                }}
            />
        </SectionLayout>
        :null
}

AddTransaction.propTypes = {
    categories: PropTypes.array,
    incomes: PropTypes.array
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    incomes: state.income.incomes,
    rates: state.system.exchangeRate
})

export default compose(
    connect(mapStateToProps, {updateIncome, addExpense, setAlert}),
    WithTranslation
)(AddTransaction);
