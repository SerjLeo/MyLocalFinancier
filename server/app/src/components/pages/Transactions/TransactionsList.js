import React, {useState} from 'react';
import Searchbar from "../../helpers/Searchbar";
import TransactionCard from "./TransactionCard";
import Spinner from "../../layout/Spinner";
import {Button, Typography} from "@material-ui/core";
import WithTranslation from "../../translation/withTranslationHOC";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {makeStyles} from "@material-ui/styles";
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteSingleTransaction, setAlert, updateIncome} from "../../../actions";
import FinanceService from "../../../services/FinanceService";

const useStyles = makeStyles({
    scrollRoot: {
        maxHeight: '485px',
        paddingBottom: '10px',
        width: '100%',
    },
    scrollContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        width: '100%',
        textAlign: "center"
    }
})

const TransactionsList = ({
    strings,
    transactions,
    handleClick,
    loading,
    categories,
    incomes,
    deleteSingleTransaction,
    updateIncome,
    setAlert,
    categoryFilters = false,
    incomeFilters = false
  }) => {
    const classes = useStyles()
    const financeService = new FinanceService()
    const[filters, setFilters] = useState({
        income: '',
        category: '',
        type: null,
        search: ''
    })

    const handleChange = e => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const filterTransactions = t => {
        if(filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false
        if(filters.income && (t.income._id !== filters.income)) return false
        if(filters.category && (t.category._id !== filters.category)) return false
        if(filters.type && (t.type !== filters.type)) return false
        return true
    }

    if (transactions && transactions.length === 0 && !loading) {
        return (<div>
                    {strings.empty}
                </div>
        )
    }

    const handleDelete = transaction => {
        try {
            if(transaction.income) {
                const income = incomes.find(i => i._id === transaction.income._id)
                const newBalance = financeService.calcBalance(income.balance, transaction.amount, !transaction.type)
                updateIncome(income._id, newBalance)
            }
            deleteSingleTransaction(transaction._id)
        } catch (error) {
            setAlert(error.message, 'warning')
        }
    }

    return (
        <>
            <Typography gutterBottom variant='h5' className={classes.title}>{strings.title}</Typography>
            <Searchbar search categoryFilters={categoryFilters} incomeFilters={incomeFilters} categories={categories} incomes={incomes} filters={filters} onChange={handleChange}/>
            <SimpleBar className={classes.scrollRoot} >
                <div className={classes.scrollContent}>
                    {transactions?transactions.filter(filterTransactions).map(transaction => {
                        return <TransactionCard
                            key={transaction._id}
                            transaction={transaction}
                            onDelete={handleDelete}
                        />
                    }):null}
                </div>
            </SimpleBar>
            {loading
                ?<Spinner/>
                :handleClick?<Button fullWidth onClick={handleClick} style={{marginTop: 10}}>
                    {strings.loadMore}
                </Button>:null
            }
        </>
    );
};

export default compose(
    connect(null, {deleteSingleTransaction, updateIncome, setAlert}),
    WithTranslation
)(TransactionsList)
