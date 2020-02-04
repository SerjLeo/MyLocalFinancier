import React from 'react'
import {Paper, Typography} from '@material-ui/core'

const DepositCard = ({amount, currency, date}) => {
    let rexp = new RegExp("[-t:/.]", "gim")
    let dateArr = date.split(rexp)
    return (
        <Paper elevation={0} style={{display: 'flex', minWidth: '100%', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
            <Typography color='primary'>{amount} {currency === 'RUB'?'₽':currency === 'EUR'?'€':'$'}</Typography>
            <div>
                {dateArr[2]}.{dateArr[1]}.{dateArr[0]}
            </div>
        </Paper>
    )
}

export default DepositCard