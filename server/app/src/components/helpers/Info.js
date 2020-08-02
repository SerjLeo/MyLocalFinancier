import React from 'react'
import PropTypes from 'prop-types'
//Material-UI
import Popover from '@material-ui/core/Popover';
import InfoIcon from '@material-ui/icons/Info';
import {Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    root: {
        width: 20,
        height: 20,
        display: 'block',
        margin: 5,
        right: 15,
        top: 15
    },
    icon: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        borderRadius: '50%',
        outline: 'none',
        borderStyle: 'none',
        backgroundColor: theme.palette.info.contrastText,
        color: theme.palette.info.dark,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    button: {
        borderRadius: "50%",
        width: 20,
        boxShadow: 'none',
        borderStyle: 'none',
        height: 20,
        position: 'relative',
        '&:focus': {
            outline: 'none'
        }
    }
}))

const Info = ({text}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const classes = useStyles();
    return (
        <div className={classes.root} key='info-button' >
            <button className={classes.button} onClick={e => handleClick(e)}>
                <InfoIcon className={classes.icon}/>
            </button>
            <Popover 
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Paper style={{margin:'0', padding: 30}}>
                    {text}
                </Paper>
            </Popover>
        </div>
    )
}

Info.propTypes = {
    text: PropTypes.string.isRequired
}

export default Info;
