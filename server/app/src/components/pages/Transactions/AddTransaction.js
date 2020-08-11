import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {compose} from 'redux'
import FinanceService from '../../../services/FinanceService';
import {updateIncome, addTransaction, setAlert} from '../../../actions'

import SectionLayout from '../../layout/SectionLayout';
import WithTranslation from '../../translation/withTranslationHOC';
import AddTransactionForm from "../../helpers/AddTransactionForm";

const AddTransaction = ({categories, addTransaction, incomes, strings, setAlert, updateIncome}) => {
    const finService = new FinanceService();

    const [formData, setFormData] = React.useState({
        title: '',
        amount: 0,
        income: '',
        category: '',
        type: false
    });
    const [loading, setLoading] = React.useState(false)
    const {title, amount, income, category, type} = formData;

    const handleChange = e => {
        if (e.target.name === 'type') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.checked
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        try {
            const realAmount = finService.convertToFloat(amount)
            const newBalance = finService.calcBalance(income.balance, realAmount, type);

            const newTransaction = {
                title: title,
                income: income._id,
                type: type,
                currency: income.currency,
                category: category._id,
                amount: realAmount
            }

            await addTransaction(newTransaction);
            const updatedIncome = await updateIncome(income._id, newBalance);
            setLoading(false)
            setFormData({
                ...formData,
                income: updatedIncome
            })
        } catch(err) {
            setAlert(err.message, 'warning')
        }

    }
    return incomes && incomes.length !== 0 && categories && categories.length !== 0
        ?<SectionLayout title={strings.title}>
            <AddTransactionForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                incomes={incomes}
                income={income}
                categories={categories}
                category={category}
                amount={amount}
                title={title}
                loading={loading}
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
    connect(mapStateToProps, {setAlert, addTransaction, updateIncome}),
    WithTranslation
)(AddTransaction);
