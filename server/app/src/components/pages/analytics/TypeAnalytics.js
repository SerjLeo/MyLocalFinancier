import React, {useEffect, useState} from 'react'
import AnalyticService from '../../../services/analyticService'
import moment from 'moment'
import PieGraph from "./Graphs/PieGraph";
import AnalyticsFilters from "./AnalyticsFilters";
import EmptyData from "./EmptyData";

const TypeAnalytics = React.memo(({
    categories,
    transactions,
    incomes,
    showCategoryFilters,
    showIncomeFilters,
    isWide = true,
    singleIncome,
    singleCategory,
    singleCurrency
}) => {
    const aS = new AnalyticService()
    const [graphData, setGraphData] = useState(() => '')
    const [filters, setFilters] = useState(() => ({
        currency: singleCurrency?singleCurrency:'RUB',
        income: singleIncome?singleIncome:'',
        category: singleCategory?singleCategory:'',
        timePeriod: 'month',
        month: moment().month(),
        year: moment().year(),
        startDate: moment('01-01-2020',"MM-DD-YYYY"),
        endDate: moment()
    }))

    useEffect(() => {
        if(transactions && categories && incomes) {
            if(filters.timePeriod !== 'custom') {
                const {startDate, endDate} = aS.extractTimePeriodBorders(filters.timePeriod, filters.month, filters.year)
                const data = aS.getGraphData(
                    aS.sortByType(
                        aS.filterByTime(
                            aS.filterByCurrency(
                                aS.filterByAttribute(
                                    aS.filterByAttribute(
                                        transactions,
                                        'income',
                                        filters.income
                                    ),
                                    'category',
                                    filters.category
                                ),
                                filters.currency
                            ),
                            endDate,
                            startDate
                        )
                    ),
                    [{_id: '0', title: '-', color: '#ef6c00'},{_id: '1', title: '+', color: '#689f38'}]
                )
                setGraphData(data)
            } else {
                const data = aS.getGraphData(
                    aS.sortByType(
                        aS.filterByTime(
                            aS.filterByCurrency(
                                aS.filterByAttribute(
                                    aS.filterByAttribute(
                                        transactions,
                                        'income',
                                        filters.income
                                    ),
                                    'category',
                                    filters.category
                                ),
                                filters.currency
                            ),
                            filters.endDate.format(),
                            filters.startDate.format()
                        )
                    ),
                    [{_id: '0', title: '-', color: '#ef6c00'},{_id: '1', title: '+', color: '#689f38'}]
                )
                setGraphData(data)
            }
        }
    }, [transactions, incomes, categories, filters])

    const handleChange = e => setFilters({
        ...filters,
        [e.target.name]: e.target.value
    })

    const changeStartDate = date => {
        if(!!date) {
            setFilters({
                ...filters,
                startDate: date
            })
        }
    }

    const changeEndDate = date => {
        if(!!date) {
            setFilters({
                ...filters,
                endDate: date
            })
        }
    }

    return (
        <>
            <AnalyticsFilters
                filters={filters}
                onChange={handleChange}
                changeStartDate={changeStartDate}
                changeEndDate={changeEndDate}
                isWide={isWide}
                incomes={incomes}
                categories={categories}
                showCategoryFilters={showCategoryFilters}
                showIncomeFilters={showIncomeFilters}
                singleIncome={singleIncome}
                singleCategory={singleCategory}
                singleCurrency={singleCurrency}
            />
            {graphData && graphData.data && graphData.data.length
                ?<PieGraph
                    graphData={graphData}
                />
                :<EmptyData/>
            }
        </>
    )
})

export default TypeAnalytics
