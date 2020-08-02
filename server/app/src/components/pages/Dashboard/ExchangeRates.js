import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getRate} from "../../../actions";
import {makeStyles} from '@material-ui/core'
import financeService from '../../../services/FinanceService'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Spinner from "../../layout/Spinner";

const useStyles = makeStyles(theme => ({
    ratesContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
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

const ExchangeRates = ({exchangeRate, getRate}) => {

    React.useEffect(() => {
        if(!exchangeRate) getRate()
    } )

    const classes = useStyles()
    let USDtrend, EURtrend, USDrate, EURrate
    if(exchangeRate) {
        let {USDratePrev, EURratePrev} = exchangeRate;
        EURrate = exchangeRate.EURrate
        USDrate = exchangeRate.USDrate
        const finService = new financeService();
        USDtrend = finService.trend(USDrate, USDratePrev);
        EURtrend = finService.trend(EURrate, EURratePrev);
    }

    return (
        exchangeRate?
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
        </div>:
        <Spinner/>
    )
}

ExchangeRates.propTypes = {
    exchangeRate: PropTypes.object,
    getRate: PropTypes.func
}

export default connect(state => ({exchangeRate: state.system.exchangeRate}),{getRate})(ExchangeRates)
