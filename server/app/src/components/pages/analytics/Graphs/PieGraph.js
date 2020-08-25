import React from 'react';
import Chart from 'chart.js';

import '../graph.css'

export default class PieGraph extends React.PureComponent {

    constructor (props) {
        super(props)
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const ctx = this.chartRef.current.getContext("2d");
        this.chart = new Chart(ctx, {
            type: 'pie',
            label: 'Graph Pie',
            data: {
                datasets: [{
                    data: this.props.graphData.data,
                    backgroundColor: this.props.graphData.colors,
                    borderWidth: 1
                }],
                labels: this.props.graphData.labels
            },
            options: {
                responsive: true
            }
        });
    }

    componentDidUpdate() {
        this.chart.data.labels = this.props.graphData.labels
        this.chart.data.datasets = [{
            data: this.props.graphData.data,
            backgroundColor: this.props.graphData.colors,
            borderWidth: 1
        }]
        this.chart.update()
    }

    render() {
        return (
            <div className={'pieGraphContainer'}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        );
    }
};
