import {months, yearLabels} from './defaultData'
import moment from "moment";

export default class AnalyticService {

    extractTimePeriodBorders(type = 'month', month = 1, year = 2020) {
        switch (type) {
            case 'month':
                return {
                    startDate: moment(`${month+1}-01-${year}`,'MM-DD-YYYY').startOf('month').format(),
                    endDate: moment(`${month+1}-1-${year}`,'MM-DD-YYYY').endOf('month').format()
                }
            case 'year':
                return {
                    startDate: moment(`1-1-${year}`).startOf('year').format(),
                    endDate: moment(`1-1-${year}`).endOf('year').format()
                }
            case 'all':
                return {
                    startDate: moment(`1-1-2000`).startOf('year').format(),
                    endDate: moment().endOf('year').format()
                }
            default:
                return
        }
    }

    calcTotalAmount(transactions = []) {
        return transactions.reduce((total, transaction) => total += transaction.amount, 0)
    }

    findLabel(id, attributes = []) {
        return attributes.find(el => el._id === id)['title']
    }

    findColor(id, attributes = []) {
        return attributes.find(el => el._id === id)['color']
    }

    filterByType(transactions = [], type = true) {
        return transactions.filter(t => t.type === type)
    }
    filterByAttribute(transactions, attribute, attributeId) {
        if(attributeId && transactions.length) {
            return transactions.filter(t =>t[attribute] && (t[attribute]._id === attributeId))
        }
        return transactions
    }

    filterByTime(transactions = [], endDate = {}, startDate = 0 ) {
        const endDate_timestamp = moment(endDate).unix()
        const startDate_timestamp = startDate?moment(startDate).unix():0
        return transactions.filter(t => (moment(t.date).unix() >= startDate_timestamp && moment(t.date).unix() <= endDate_timestamp))
    }

    filterByCurrency(transactions = [], currency = 'USD') {
        return transactions.filter(t => t.currency === currency)
    }

    //@Return Array [ [ attribute_id, Array<transactions> ] ]
    //@Should be invoked after all filter functions
    sortByAttribute(transactions = [], sortBy = 'income') {
        if(transactions.length && transactions[0][sortBy]) {
            const attributes = transactions.reduce((attributes, transaction) => ({
                ...attributes,
                [transaction[sortBy]._id]:[]
            }),{})

            return Object.entries(
                transactions.reduce((sorted, transaction) => {
                    const id = transaction[sortBy]._id;
                    sorted[id] = [...sorted[id], transaction];
                    return sorted;
                }, attributes)
            )
        }
        return []
    }

    //@Return Array [ [ type 0|1, Array<transactions> ] ]
    //@Should be invoked after all filter functions
    sortByType(transactions = []) {
        if(transactions.length && transactions[0].hasOwnProperty('type')) {
            const types = {
                0: [],
                1: []
            }
            return Object.entries(
                transactions.reduce((sorted, transaction) => {
                    return transaction.type
                        ?{
                            ...sorted,
                            1: [...sorted['1'], transaction]
                        }
                        :{
                            ...sorted,
                            0: [...sorted['0'], transaction]
                        }
                }, types)
            )
        }
        return []
    }

    //@Return Object {data: Array<Number>, labels: Array<String>, colors: Array<String>}
    //@Accept sorted transactions in result of 'sortByAttribute', 'SortByType'
    getGraphData(sortedTransactions, attributes) {
        const graphData = {
            data: [],
            labels: [],
            colors: []
        }
        sortedTransactions.forEach(group => {
            graphData.labels.push(this.findLabel(group[0], attributes))
            graphData.colors.push(this.findColor(group[0], attributes))
            graphData.data.push(this.calcTotalAmount(group[1]))
        })
        return graphData
    }
}
