import React from 'react'
import {IconButton, Popover} from '@material-ui/core'


const PopoverButtonLayout = ({children, icon}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const Icon = icon;
    return (
        <div key='create-button'>
            <IconButton color="primary" aria-label="add" style={{outline:'none', boxShadow:'none'}} onClick={e => handleClick(e)}>
                <Icon/>
            </IconButton>
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
        </div>
    )
}

export default PopoverButtonLayout
