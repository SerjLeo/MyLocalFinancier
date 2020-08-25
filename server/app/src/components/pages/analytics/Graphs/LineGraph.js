import React from 'react'
import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"

// const classes = useStyles();
export default class LineGraph extends React.PureComponent {
    constructor (props) {
        super(props)
        this.chartRef = React.createRef();
        this.chart = {}
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        const {width: graphWidth} = myChartRef.canvas;
        const {depositData, expenseData, labels} = this.props
        //creating gradient
        let depositGrd=myChartRef.createLinearGradient(0,0,graphWidth,0);
        depositGrd.addColorStop(0,"rgba(36, 201, 56, 0.3)");
        depositGrd.addColorStop(1,"rgba(63, 171, 17, 0.3)");

        let expensetGrd=myChartRef.createLinearGradient(0,0,graphWidth,0);
        expensetGrd.addColorStop(0,"rgba(227, 153, 16, 0.3)");
        expensetGrd.addColorStop(1,"rgba(219, 121, 15, 0.3)");

        this.chart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    // {
                    //     label: "Expense",
                    //     data: data,
                    //     // fill: false,
                    //     background: 'red'
                    //     // lineTension: 0.4
                    // },
                    {
                        label: "Deposit",
                        data: depositData,
                        borderColor: depositGrd,
                        backgroundColor: depositGrd,
                        fill: false
                    },
                    {
                        label: "Expense",
                        data: expenseData,
                        borderColor: expensetGrd,
                        backgroundColor: expensetGrd,
                        fill: false
                    }
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                aspectRatio: 1.5,
                layout: {
                    padding: {
                        top: 5,
                        left: 10,
                        right: 10,
                        bottom: 10
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            // display: false,
                            // drawBorder: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }]
                }
            }
        });
    }
    
    componentDidUpdate(){
        
        const myChartRef = this.chartRef.current.getContext("2d");

        const {width: graphWidth} = myChartRef.canvas;

        let depositGrd=myChartRef.createLinearGradient(0,0,graphWidth,0);
        depositGrd.addColorStop(0,"rgba(36, 201, 56, 0.3)");
        depositGrd.addColorStop(1,"rgba(63, 171, 17, 0.3)");

        let expensetGrd=myChartRef.createLinearGradient(0,0,graphWidth,0);
        expensetGrd.addColorStop(0,"rgba(227, 153, 16, 0.3)");
        expensetGrd.addColorStop(1,"rgba(219, 121, 15, 0.3)");

        this.chart.data.labels = this.props.labels
     
        this.chart.data.datasets = [
            {
                label: "Deposit",
                data: this.props.depositData,
                borderColor: depositGrd,
                backgroundColor: depositGrd,
                fill: false
            },
            {
                label: "Expense",
                data: this.props.expenseData,
                borderColor: expensetGrd,
                backgroundColor: expensetGrd,
                fill: false
            },
        ]

        this.chart.update(0)
    }

    classes = this.props.classes

    render() {
        
        return (
            <div className={this.classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
