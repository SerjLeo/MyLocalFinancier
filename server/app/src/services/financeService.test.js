import FinanceService from './FinanceService'

const financeService = new FinanceService

describe('financeService: convertToFloat', () => {
    test('should be defined', () => {
        expect(financeService.convertToFloat).toBeDefined()
    })
    test('should return number', () => {
        expect(financeService.convertToFloat(3)).toBe(3)
        expect(financeService.convertToFloat('3')).toBe(3)
        expect(financeService.convertToFloat('3,14')).toBe(3.14)
        expect(financeService.convertToFloat('3,14132323')).toBe(3.14)
        expect(financeService.convertToFloat('keks')).toBe(NaN)
    })
})
