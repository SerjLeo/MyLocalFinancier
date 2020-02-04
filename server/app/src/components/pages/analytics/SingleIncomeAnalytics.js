import React, {useEffect} from 'react'
import PageLayout from '../../layout/PageLayout'
import {makeStyles} from '@material-ui/core'
import Chart from 'chart.js';
import AnalyticService from '../../../services/analyticService'

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"

const useStyles = makeStyles(theme=>({
    graphContainer: {
        marginTop: 20,
        width: 'inherit',
        background: 'white',
        padding: '30px 20px 10px 20px',
        borderRadius: 10,
        boxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)'
    }
}))

const SingleIncomeAnalytics = ({income}) => {
    const analyticService = new AnalyticService({income});
    const sortedDeposits = analyticService.sortIncomeDepositsByTime()
    
    const data = analyticService.getDepositData(sortedDeposits)

    console.log(data)

    const chartRef = React.createRef();
    const classes = useStyles();
    useEffect(()=>{
        const myChartRef = chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: data.labels,
                datasets: [
                    {
                        label: "Deposit summary",
                        data: data.values,
                        backgroundColor: 'rgba(42, 156, 22,0.5)'
                    }
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                // maintainAspectRatio: false
            }
        });
    }) 


    return (
        <div className={classes.graphContainer}>
            <canvas id="myChart" ref={chartRef} aria-label="Hello ARIA World" role="img"/>
        </div>
    )
}

export default SingleIncomeAnalytics