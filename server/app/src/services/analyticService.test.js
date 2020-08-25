import AnalyticService from './analyticService'
import {beforeEach, describe, expect} from "@jest/globals";
import transaction from "../reducers/transaction";

const analyticService = new AnalyticService()

const transaction_1 = {
        name:6,
        type: true,
        date: '2020-06-24T14:50:50.234+00:00'
    }
const transaction_2 =   {
        name:4,
        type: false,
        date: '2020-04-24T14:50:50.234+00:00'
    }
const transaction_3 =    {
        name:3,
        type: true,
        date: '2020-03-24T14:50:50.234+00:00'
    }
const transaction_4 =   {
        name:2,
        type: false,
        date: '2020-02-24T14:50:50.234+00:00'
    }
const transaction_5 =   {
        name:1,
        type: true,
        date: '2020-01-24T14:50:50.234+00:00'
    }


describe('analyticService: filterFunctions', () => {

    let transactions

    beforeEach(() => {
        transactions = [
            transaction_1,
            transaction_2,
            transaction_3,
            transaction_4,
            transaction_5
        ]
    })

    test('should return Array, containing certain values (filterByType)', () => {
        expect(analyticService.filterByType()).toBeDefined()
        expect(analyticService.filterByType(transactions, false)).toContain(transaction_4)
        expect(analyticService.filterByType(transactions, false)).not.toContain(transaction_5)
        expect(analyticService.filterByType(transactions, true)).toContain(transaction_5)
    })

    test('should return Array, containing certain values (filterByTime)', () => {
        expect(analyticService.filterByTime()).toBeDefined()
        expect(analyticService.filterByTime(transactions)).toContain(transaction_4)
        expect(analyticService.filterByTime(transactions, '2020-01-23T14:50:50.234+00:00')).not.toContain(transaction_5)
    })

    test('should return Array, containing certain values (sortByCategories)', () => {
        expect(analyticService.sortByAttribute()).toBeDefined()
        expect(analyticService.sortByAttribute(transactions, 'category')).toBeTruthy()
    })
})
