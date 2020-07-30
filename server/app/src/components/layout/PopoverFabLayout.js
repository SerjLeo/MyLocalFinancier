import React from 'react'
import {Fab, Popover, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.pageContainer,
    pageWrapper: theme.commonStyles.pageWrapper,
    fabContainer: {
        width: 80,
        height:"100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5
    },
    subtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: 500
    }
}))

const PopoverFabLayout = ({children, icon, buttonText}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const Icon = icon;
    return (
        <div className={classes.fabContainer} key='create-button'>
            <Fab color="primary" aria-label="add" style={{outline:'none', boxShadow:'none'}} onClick={e => handleClick(e)}>
                <Icon/>
            </Fab>
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
                        {children}
                </Popover>
                <Typography className={classes.subtitle}>{buttonText}</Typography>
        </div>
    )
}

export default PopoverFabLayout