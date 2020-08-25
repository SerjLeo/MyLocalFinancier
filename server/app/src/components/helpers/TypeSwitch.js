import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import './switch.css'

const TypeSwitch = ({onChange, name}) => {

    return <>
        <label className="switch">
            <input type="checkbox" onChange={e => onChange(e)} name={name}/>
            <span className="slider"></span>
            <div className="btn remove">
                <RemoveIcon/>
            </div>
            <div className="btn add">
                <AddIcon/>
            </div>
        </label>
    </>
};

export default TypeSwitch;
