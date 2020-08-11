import {setAlert} from './alert';
import {register, loadUser, login, logout, confirmEmail} from './auth';
import {getProfile, setProfile} from './profile';
import {updateIncome, getIncomeByID, addIncome, getIncomes, deleteIncome} from './income';
import {getCategories, addCategory, deleteCategory, getCategoryByID} from './category';
import {getRate, setLanguage} from './helpers';
import {addTransaction, getTransactions} from './transaction'

export {
    register,
    loadUser,
    login,
    logout,
    //profile
    getProfile,
    setProfile,
    //system
    getRate,
    setLanguage,
    confirmEmail,
    setAlert,
    //categories
    deleteCategory,
    getCategoryByID,
    addCategory,
    getCategories,
    //incomes
    updateIncome,
    getIncomeByID,
    addIncome,
    getIncomes,
    deleteIncome,
    //transactions
    addTransaction,
    getTransactions
}
