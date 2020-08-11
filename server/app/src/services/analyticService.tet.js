// import AnalyticService from './analyticService'
//
// const analyticService = new AnalyticService()
//
// describe('analyticService: sortByMonths', () => {
//
//     let array
//     beforeEach(() => {
//         array = [
//             {
//                 name:6,
//                 date: '2020-06-24T14:50:50.234+00:00'
//             },
//             {
//                 name:4,
//                 date: '2020-04-24T14:50:50.234+00:00'
//             },
//             {
//                 name:3,
//                 date: '2020-03-24T14:50:50.234+00:00'
//             },
//             {
//                 name:2,
//                 date: '2020-02-24T14:50:50.234+00:00'
//             },
//             {
//                 name:1,
//                 date: '2020-01-24T14:50:50.234+00:00'
//             }
//         ]
//     })
//
//     test('should be define and return array', () => {
//         expect(analyticService.sortByMonths).toBeDefined()
//         expect(analyticService.sortByMonths(array)).toBeInstanceOf(Array)
//     })
//
//     // test('should accept array of objects containing data', () => {
//     //     let result = analyticService.sortByMonths(array)
//     //     let expected = [false, 0, '', {number: 42}, [1,2,3], true, 'Hello']
//     //     expect(result).toEqual(
//     //         expect.not.arrayContaining(expected),
//     //       );
//     // }) Passed
//
//     test('should sort objects by Months and Years', () => {
//         let result = [
//             ['January', '2020', [{
//                 name:1,
//                 date: '2020-01-24T14:50:50.234+00:00'
//             }]],
//             ['Febrary', '2020', [{
//                 name:2,
//                 date: '2020-02-24T14:50:50.234+00:00'
//             }]],
//             ['March', '2020', [{
//                 name:3,
//                 date: '2020-04-24T14:50:50.234+00:00'
//             }]],
//             ['April', '2020', [{
//                 name:4,
//                 date: '2020-06-24T14:50:50.234+00:00'
//             }]],
//             ['May', '2020', []],
//             ['June', '2020', [{
//                 name:6,
//                 date: '2020-06-24T14:50:50.234+00:00'
//             }]],
//         ]
//         expect(analyticService.sortByMonths(array)).toBe(result)
//     })
// })
