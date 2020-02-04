import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Chart from 'chart.js';
import AnalyticService from '../../../services/analyticService'
import PageLayout from '../../layout/PageLayout'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    graphContainer: {
        marginTop: 100,
        minWidth: '100%',
        background: 'white',
        padding: '30px 20px 10px 20px',
        borderRadius: 10,
        boxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)'
    }
}))



const CategoriesAnalytic = ({categories, transactions}) => {

    const analyticService = new AnalyticService({transactions});
    const sortedTransactions = analyticService.sortTransactionsByCategories();
    console.log(sortedTransactions);
    const categoriesValue = analyticService.sortedTransactionToData(sortedTransactions);
    console.log(categoriesValue)

    const chartRef = React.createRef();
    const classes = useStyles();
    useEffect(()=>{
        const myChartRef = chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "pie",
            data: {
                //Bring in data
                labels: categoriesValue[0],
                datasets: [
                    {
                        label: "Sales",
                        data: categoriesValue[1],
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }) 


    return (
        <PageLayout>
            <div className={classes.graphContainer}>
                <canvas id="myChart" ref={chartRef} aria-label="Hello ARIA World" role="img"/>
            </div>
        </PageLayout>
    )
}

const mapStateToProps = state => ({
    categories: state.finance.finance.categories,
    transactions: state.finance.finance.transactions
})

export default connect(mapStateToProps)(CategoriesAnalytic)