import {months, yearLabels} from './defaultData'

export default class AnalyticService {
    constructor({incomes = [], categories = [], transactions = [], income = {}, category = {}}) {
        this.transactions = transactions
        this.incomes = incomes
        this.categories = categories
        this.income = income
        this.category = category
    }

    sortTransactionsByCategories = () => {
        const categories = this.transactions.reduce((transactions, transaction) => ({
            ...transactions,
            [transaction.category.title]:[]
        }),{})

        return Object.entries(
            this.transactions.reduce((transactions, transaction) => {
            const {title} = transaction.category;
            
            transactions[title] = [...transactions[title], transaction];
    
            return transactions;
        }, categories));
    }

    sortedTransactionToData = (sortedTransactions) => {
        let labels = [];
        let values = [];
        return sortedTransactions.reduce((data, category) => {
            labels.push(category[0]);
            const value = category[1].reduce((value, transaction) => (value += transaction.amount),0);
            values.push(value);
            return data = [labels,values]
        },[])
    }
    //returns [['Month',[{deposits}, ...], ...]]
    sortIncomeDepositsByTime = () => {
        if(this.income.length === 0) {
            return null
        }
        const byMonths = yearLabels.reduce((months, month) => {
            return {
                ...months,
                [month]:[]
            }
        },{})

        let sortedDeposits = Object.entries(
            this.income.deposits.reduce((deposits, deposit) => {
            let rexp = new RegExp("[-t:/.]", "gim")
            let dateArr = deposit.date.split(rexp)
            let date = months[parseInt(dateArr[1])]
            deposits[date] = [...deposits[date], deposit];
            return deposits;
        }, byMonths));

        let pending = [];
        let notNull = false;

        return sortedDeposits.reduce((reducedArr, element) => {
            if(element[1].length !== 0 ) {
                notNull = true
                reducedArr = [
                    ...reducedArr,
                    ...pending,
                    element
                ]
                pending = []
            } else {
                if(notNull) {
                    pending.push(element)
                }
            }
            return reducedArr
        }, [])
    }
    //returns {labels:['Month",...],values:[Number, ...]}
    getDepositData = (sortedDeposits) => {
        let labels = [];
        let values = [];
        return sortedDeposits.reduce((data, element) => {
            labels.push(element[0]);
            const value = element[1].reduce((sum, deposit) => (sum += deposit.amount * deposit.exchangeRate.$numberDecimal),0);
            values.push(parseFloat(value.toFixed(2)));
            return data = {
                labels,
                values
            }
        },[])
    }
}