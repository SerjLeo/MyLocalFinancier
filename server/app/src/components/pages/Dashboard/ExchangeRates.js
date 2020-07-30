import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core'
import financeService from '../../../services/financeService'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    ratesContainer: {
        display: 'flex',
        flexDirection: 'column',
        cursor:'pointer'
    },
    chart: {
        display: 'flex',
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

const ExchangeRates = ({exchangeRate}) => {
    const classes = useStyles()
    let {USDrate, USDratePrev, EURrate, EURratePrev} = exchangeRate;
    const finService = new financeService();
    const USDtrend = finService.trend(USDrate, USDratePrev);
    const EURtrend = finService.trend(EURrate, EURratePrev);

    return (
            <div className={classes.ratesContainer}>
                <div className={classes.chart}>
                    RUB/USD{' '}
                    {USDtrend?<ExpandLessIcon style={{color: 'green'}}/>
                    :<ExpandMoreIcon style={{color: 'Red'}}/>}
                    {USDrate}
                </div>
                <div className={classes.chart}>
                    RUB/EUR{' '}
                    {EURtrend?<ExpandLessIcon style={{color: 'green'}}/>
                    :<ExpandMoreIcon style={{color: 'Red'}}/>}
                    {EURrate}
                </div>
            </div>
    )
}

ExchangeRates.propTypes = {
    exchangeRate: PropTypes.object
}

export default ExchangeRates