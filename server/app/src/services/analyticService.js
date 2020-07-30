import {months, yearLabels} from './defaultData'

export default class AnalyticService {

    sortTransactionsByCategories = transactions => {
        const categories = transactions.reduce((transactions, transaction) => ({
            ...transactions,
            [transaction.category.title]:[]
        }),{})

        return Object.entries(
            transactions.reduce((transactions, transaction) => {
            const {title} = transaction.category;
            
            transactions[title] = [...transactions[title], transaction];
    
            return transactions;
        }, categories));
    }

    extractDate = date => {
        let rexp = new RegExp("[-t:/.]", "gim")
        return date.split(rexp)
        
    }

    getMonthsArray = (startMonth=1, endMonth=12) => {
        let monthsData = {}
        for(let i = startMonth; i <= endMonth; i++) {
            monthsData = {
                ...monthsData,
                [this.getMonthLabel(i)]:[]
            }
        }
        return monthsData
    }

    getMonthLabel = number => months[number]

    getYearsArray = (startDate, endDate) => {
        let years = []
        for(let i = startDate[0]; i <= endDate[0]; i++) {
            years.push(i)
        }
        let yearsData = {}
        for(let i = startDate[0]; i <= endDate[0]; i++) {
            if(startDate[0] === endDate[0]) {
                yearsData = {
                    ...yearsData,
                    [i]:this.getMonthsArray(startDate[1],endDate[1])
                }
                break
            } else if (i === startDate[0]) {
                yearsData = {
                    ...yearsData,
                    [i]:this.getMonthsArray(startDate[1])
                }
            } else if (i === endDate[0]) {
                yearsData = {
                    ...yearsData,
                    [i]:this.getMonthsArray(1, endDate[1])
                }
            } else {
                yearsData = {
                    ...yearsData,
                    [i]:this.getMonthsArray()
                }
            }
        }
        return yearsData
    }

    sortByMonths = (dataArray, startDate = [2019, 1], endDate = [2020, 12]) => {
        dataArray = dataArray.filter(el => el instanceof Object)
        dataArray = dataArray.filter(el => !!el.date)
        dataArray = dataArray.reduce((data, item) => {
            let date = this.extractDate(item.date)
            let month = parseInt(date[1])
            let monthLabel = this.getMonthLabel(month)
            let year = parseInt(date[0])
            if (year >= startDate[0] && year <= endDate[0]) {
                if (year === startDate[0]) {
                    if (month >= startDate[1]) {
                        if(startDate[0] === endDate[0]) {
                            if (month <= endDate[1])
                                data[year][monthLabel] = [...data[year][monthLabel], item]
                        } else
                            data[year][monthLabel] = [...data[year][monthLabel], item]
                    }
                } else if (year === endDate[0]) {
                    if (month < endDate[1]) {
                        data[year][monthLabel] = [...data[year][monthLabel], item]
                    }
                } else {
                    data[year][monthLabel] = [...data[year][monthLabel], item]
                }
            }
            return data
        }, this.getYearsArray(startDate, endDate))

        for (let year in dataArray) {
            dataArray[year] = Object.entries(dataArray[year])
        }

        return Object.entries(dataArray)
    }

    calcMonthTotal = (transactionsArray) => transactionsArray.reduce((monthTotal, transaction) => {
        return monthTotal += transaction.exchangeRate * transaction.amount
    },0)

    toLineGraphData = (sortedTransactions) => {
        let labels = [];
        let values = [];

        sortedTransactions.forEach(year => {
            let yearLabel = year[0].substr(2,2)
            year[1].forEach(month => {
                let fullLabel = month[0].substr(0,3) + ' ' + yearLabel
                labels.push(fullLabel)
                let monthTotal = this.calcMonthTotal(month[1])
                values.push(monthTotal)
            })
        });

        return [labels,values]
    }

    sortIncomeDepositsByTime = deposits => {
        
        const byMonths = yearLabels.reduce((months, month) => {
            return {
                ...months,
                [month]:[]
            }
        },{})

        let sortedDeposits = Object.entries(
            deposits.reduce((deposits, deposit) => {
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
    getDepositData = sortedDeposits => {
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