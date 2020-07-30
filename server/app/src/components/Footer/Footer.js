import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    footerConataner: {
        padding: 10,
        height: '7vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100wv',
        backgroundColor: 'rgba(44, 48, 44,0.8)'
        // bottom: 0
    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.footerConataner}>
            <div>
                My Local Financier 2020 &copy; <br/>
                All rights reserved
            </div>
            <div>Contacts</div>
        </div>
    )
}

export default Footer