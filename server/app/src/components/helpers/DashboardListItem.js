import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'

import Fab from '@material-ui/core/Fab';
const DashboardListItem = ({name, type, icon, balance, currency, color, id}) => {
    const [redirect, setRedirect] = useState(false)

    if(redirect){
        return <Redirect to={`/${type}/${id}`}/>
    }
    return (
        <div style={{width:"73px", height:"100%", display:"block", margin:'5px'}}>
            <Fab aria-label="add" style={{outline:'none', boxShadow:'none', backgroundColor: color, color:"#f7f7f7"}} onClick={() => setRedirect(true)}>
                <i className={icon?icon:"fas fa-plus fa-lg"} style={{heigth:'24px', width:'24px'}}/>
            </Fab>
            <div className="subtitle" style={{fontSize:'12px', marginTop:'5px', fontWeight: '500'}}>{name}</div>
            {balance?<div className="subtitle" style={{fontSize:'12px', marginTop:'5px', fontWeight: '500'}}>{balance.toFixed(2)}{' '}{currency}</div>:null}
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
