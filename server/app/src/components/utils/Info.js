import React from 'react'
import PropTypes from 'prop-types'
//Material-UI
import Popover from '@material-ui/core/Popover';
import {Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    root: {
        width: 20,
        height: 20,
        display: 'block',
        margin: 5,
        position: 'absolute',
        right: 15,
        top: 15
    },
    button: {
        width: 20,
        height: 20,
        display: 'block',
        borderRadius: '50%',
        outline: 'none',
        borderStyle: 'none',
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.info.contrastText,
        '&:hover': {
            cursor: 'pointer'
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
                <i className="fas fa-info fa-xs"/>
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