import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'


import Fab from '@material-ui/core/Fab';
import getIncomeIcon from '../../layout/Icons/incomeIcons';

const DashboardListItem = ({title, icon, balance, currency, color, id}) => {
    const [redirect, setRedirect] = useState(false)

    if(redirect){
        return <Redirect push to={`/incomes/${id}`}/>
    }

    let Icon = getIncomeIcon(icon)()


    return (
        <div style={{width:"80px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", margin:'5px'}}>
            <Fab aria-label="add" style={{outline:'none', boxShadow:'none', backgroundColor: color, color:"#f7f7f7"}} onClick={() => setRedirect(true)}>
                {Icon}
            </Fab>
            <div className="subtitle" style={{fontSize:'12px', marginTop:'5px', fontWeight: '500', textAlign: 'center'}}>{title}</div>
            <div className="subtitle" style={{fontSize:'12px', marginTop:'5px', fontWeight: '500', textAlign: 'center', maxWidth: '80px', overflow:'hidden', textOverflow: 'ellipsis'}}>{balance.toFixed(2)}{' '}{currency}</div>
        </div>
    )
}

DashboardListItem.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    balance: PropTypes.number,
    currency: PropTypes.string,
    clicked: PropTypes.func,
    color: PropTypes.string
}

export default DashboardListItem
