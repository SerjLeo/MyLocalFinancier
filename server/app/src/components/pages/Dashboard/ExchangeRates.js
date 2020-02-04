import React from 'react'
import PropTypes from 'prop-types'
import {Box} from '@material-ui/core'
import {connect} from 'react-redux'
import financeService from '../../../services/financeService'

const ExchangeRates = ({exchangeRate}) => {
    let {USDrate, USDratePrev, EURrate, EURratePrev} = exchangeRate;
    // USDrate = parseFloat(USDrate);
    // EURrate = parseFloat(EURrate);
    
    
    const finService = new financeService();
    const USDtrend = finService.trend(USDrate, USDratePrev);
    const EURtrend = finService.trend(EURrate, EURratePrev);

    return (
            <Box style={{marginTop: '10px', display: 'flex', flexDirection: 'column', cursor:'pointer'}}>
                <span style={{fontSize: '16px'}}>USD{' '}
                {USDtrend?<span style={{color: 'Green'}}><i className="fas fa-arrow-alt-circle-up"></i></span>:
                <span style={{color: 'Red'}}><i className="fas fa-arrow-alt-circle-down"></i></span>}
                {USDrate}</span>
                <span style={{fontSize: '16px'}}>EUR{' '}
                {EURtrend?<span style={{color: 'Green'}}><i className="fas fa-arrow-alt-circle-up"></i></span>:
                <span style={{color: 'Red'}}><i className="fas fa-arrow-alt-circle-down"></i></span>}
                {EURrate}</span>
            </Box>
    )
}

ExchangeRates.propTypes = {
    exchangeRate: PropTypes.object
}
const mapStateToProps = (state) => ({
    exchangeRate: state.finance.exchangeRate
})
export default connect(mapStateToProps)(ExchangeRates)