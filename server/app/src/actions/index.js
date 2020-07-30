import {setAlert} from './alert';
import {register, loadUser, login, logout, confirmEmail} from './auth';
import {getProfile, setProfile} from './profile';
import {addExpense, getExpensesByIncome, getExpensesByCategory, getExpenses, loadMoreExpenses, deleteRelatedExpenses, deleteSingleExpense} from './expense';
import {updateIncome, getIncomeByID, addIncome, getIncomes, deleteIncome} from './income';
import {getCategories, addCategory, deleteCategory, getCategoryByID} from './category';
import {addDeposit, getDeposits, getDepositsByIncome, deleteRelatedDeposits, deleteSingleDeposit} from './deposit';
import {getRate, setLanguage} from './helpers';

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
    //expenses
    getExpenses,
    loadMoreExpenses,
    getExpensesByIncome,
    getExpensesByCategory,
    addExpense,
    deleteSingleExpense,
    deleteRelatedExpenses,

    //deposits
    addDeposit,
    getDeposits,
    getDepositsByIncome,
    deleteRelatedDeposits,
    deleteSingleDeposit
}