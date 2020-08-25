import React, {useState} from 'react'

import {Select, FormControl, MenuItem, makeStyles } from '@material-ui/core';
import {FlagUK, FlagRUS} from '../layout/Icons';

const styles = makeStyles(theme => ({
    icon: {
        display: 'inline-block',
        marginLeft: 3,
        [theme.breakpoints.up('sm')] : {
            height: 30,
            width: 40
        },
        [theme.breakpoints.down('xs')] : {
            height: 20,
            width: 20
        }
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    itemText: {
        [theme.breakpoints.down('xs')] : {
            display: 'none'
        }
    }
}))


const LangChange = ({onLangChange, selectedLanguage}) => {
    const [language, setLanguage] = useState(selectedLanguage);

    const handleChange = e => {
        onLangChange(e.target.value);
        setLanguage(e.target.value)
    }
    
    const classes = styles();
   
    return (
        <FormControl>
            <Select
            value={language}
            autoWidth={true}
            disableUnderline
            onChange={handleChange}
            >
                <MenuItem value='eng'>
                    <div className={classes.listItem}>
                        <span className={classes.itemText}>English</span>
                        <FlagUK clas={classes.icon}/>
                    </div>  
                </MenuItem>
                <MenuItem value='rus'>
                    <div className={classes.listItem}>
                        <span className={classes.itemText}>Russian</span>
                        <FlagRUS clas={classes.icon}/>
                    </div>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default LangChange
