import React, {useState, useEffect} from 'react'
import LineGraph from '../Graphs/LineGraph'
import {makeStyles, Typography, Slider} from '@material-ui/core'
import AnalyticService from '../../../../services/analyticService'

const useStyles = makeStyles(theme=>({
    container: {
        // height: '100vh',
        width: '100%',
        // background: 'var(--theme-primary)',
        color: 'white',
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    graphContainer: {
        width: 'inherit',
        paddingBottom: 10,
        borderRadius: 10
    }
}))

let today= new Date()

const IncomeDailyAnalytics = ({title, deposits=[], expenses=[], year = 2019}) => {
    const classes = useStyles()
    const analyticService = new AnalyticService()

    const [value, setValue] = React.useState([
        (today.getMonth() - 2 + (today.getFullYear() - year) * 12),
        (today.getMonth() + 1 + (today.getFullYear() - year) * 12)
    ]);

    const [graphData, setGraphData] = useState(null)

    useEffect(()=>{
        if(deposits.length !== 0) {
            const dates = valueToDate(value)
            let sortedDeposits = analyticService.sortByMonths(deposits, dates.startDate, dates.endDate)
            setGraphData({
                data: analyticService.toLineGraphData(sortedDeposits)[1],
                labels: analyticService.toLineGraphData(sortedDeposits)[0]
            })
        }
    },[])
    
    //Slider
    
    function valueToDate(valueArray) {
        let startDate = [(year + Math.trunc(valueArray[0]/12)), (valueArray[0]%12 + 1)]
        let endDate = [(year + Math.trunc(valueArray[1]/12)), (valueArray[1]%12 + 1)]
        return {
            startDate,
            endDate
        }
    }

    function equals(array_1, array_2) {
        // if the other array is a falsy value, return
        if (!array_1 || !array_2)
            return false;
    
        // compare lengths - can save a lot of time 
        if (array_1.length != array_2.length)
            return false;
    
        for (var i = 0; i < array_1.length; i++) {
            // Check if we have nested arrays
            if (array_1[i] instanceof Array && array_2[i] instanceof Array) {
                // recurse into the nested arrays
                if (!array_1[i].equals(array_2[i]))
                    return false;       
            }           
            else if (array_1[i] != array_2[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }       
        return true;
    }

    const handleChange = (event, newValue) => {
        if (!equals(value, newValue)) {
            const dates = valueToDate(newValue)
            let sortedDeposits = analyticService.sortByMonths(deposits, dates.startDate, dates.endDate)
            setGraphData({
                data: analyticService.toLineGraphData(sortedDeposits)[1],
                labels: analyticService.toLineGraphData(sortedDeposits)[0]
            })
            setValue(newValue);
        }
    };

    function getLabelSliderValue(value){
        let yearLabel = new String(year + Math.trunc(value/12))
        let monthLabel = analyticService.getMonthLabel(value%12 + 1)
        return monthLabel.substr(0,3) + '' + yearLabel.substr(2,2)
    }
    
    return (
        graphData
        ?<div className={classes.container}>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <LineGraph
                classes={classes}
                data={graphData.data}
                // data_2={expenseData}
                labels={graphData.labels}
            />
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={getLabelSliderValue}
                aria-labelledby="range-slider"
                min={0}
                max={11 + (today.getFullYear() - year) * 12}
                defaultValue={[today.getFullYear() -1, today.getFullYear()]}
            />
        </div>
        :null
    )
}

export default React.memo(IncomeDailyAnalytics)