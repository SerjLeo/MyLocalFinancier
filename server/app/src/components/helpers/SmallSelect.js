import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/styles";
import getCategoriesIcon from "../layout/Icons/categoriesIcons";
import getIncomeIcon from "../layout/Icons/incomeIcons";

const useStyles = makeStyles({
    root: {
        width: 50,
        height: 50,
        margin: 5,
        padding: 0,
        '&:focus': {
            borderRadius: '50%',
            backgroundColor: props => props?props.color:'rgb(72,71,71)'
        }
    },
    form: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        display: 'none',
        '&:before': {
            display: 'none'
        }
    },
    text: {
      paddingLeft: 10
    },
    label: {
        textAlign: "center"
    },
    select: {
        padding: 24,
        borderRadius: '50%',
        backgroundColor: props => props?props.color:'rgba(78,72,71,0.8)',
        border: props => props?'none':'1px solid rgba(255,255,255,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: "border-box",
        fontSize: 0,
        '& span': {
            padding: 0
        }
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const SmallSelect = ({value, name, menuItems, label, onChange}) => {
    const classes = useStyles(value)
    return (
        <FormControl required className={classes.form}>
            <div className={classes.label}>{label}</div>
            <Select
                value={value}
                name={name}
                disableUnderline
                onChange={e => onChange(e)}
                classes={{
                    root: classes.root,
                    icon: classes.icon,
                    nativeInput: classes.icon,
                    select: classes.select
                }}
            >
                {menuItems?menuItems.map(item => <MenuItem key={item._id} value={item} style={{backgroundColor: `${item.color}`}}>
                    <div className={classes.item}>
                        {name === 'income'?getIncomeIcon(item.icon)():getCategoriesIcon(item.icon)()}
                        <span className={classes.text}>{item.title}</span>
                    </div>
                </MenuItem>):null}
            </Select>
        </FormControl>
    );
};

export default SmallSelect;
