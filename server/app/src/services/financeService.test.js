import FinanceService from './FinanceService'
import {describe, expect, test} from "@jest/globals";

const financeService = new FinanceService

describe('convertToFloat function tests', () => {
    test('should be defined', () => {
        expect(financeService.convertToFloat).toBeDefined()
    })
    test('should return number', () => {
        expect(financeService.convertToFloat(3)).toBe(3)
        expect(financeService.convertToFloat('3')).toBe(3)
        expect(financeService.convertToFloat('3,14')).toBe(3.14)
        expect(financeService.convertToFloat('3,14132323')).toBe(3.14)
        expect(financeService.convertToFloat('keks')).toBe(0)
    })
    test('should return positive number', () => {
        expect(financeService.convertToFloat(-3)).toBe(3)
        expect(financeService.convertToFloat('-3')).toBe(3)
        expect(financeService.convertToFloat('-3.14')).toBe(3.14)
    })
})

describe('calcBalance function tests', () => {
    test('should be defined', () => {
        expect(financeService.calcBalance).toBeDefined()
    })
    test('should convert wrong data to 0 and continue execution', () => {
        expect(financeService.calcBalance(300, 'lol', false)).toBe(300)
        expect(financeService.calcBalance('lol', 300, true)).toBe(300)
        expect(financeService.calcBalance('lol', 'kek', true)).toBe(0)
    })
    test('should throw Error if negative balance received', () => {
        expect(() => {financeService.calcBalance(300, 400, false)}).toThrowError('negativeBalance')
        expect(() => {financeService.calcBalance('300', '500', false)}).toThrowError('negativeBalance')
        expect(() => {financeService.calcBalance('kek', '500', false)}).toThrowError('negativeBalance')
    })
    test('should correctly round new balance', () => {
        expect(financeService.calcBalance(303.25, 231.46, true)).toBe(534.71)
        expect(financeService.calcBalance(303.25, 231.46, false)).toBe(71.79)
        expect(financeService.calcBalance(30659.2467, 65987.2564, true)).toBe(96646.51)
    })
})
