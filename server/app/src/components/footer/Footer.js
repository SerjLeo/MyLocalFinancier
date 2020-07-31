import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    footerContainer: {
        padding: 10,
        height: '64px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100wv',
        backgroundColor: 'rgba(44, 48, 44,0.8)'
    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.footerContainer}>
            <div>
                My Local Financier 2020 &copy; <br/>
                All rights reserved
            </div>
            <div>Contacts: serjleodev@gmail.com</div>
        </div>
    )
}

export default Footer
