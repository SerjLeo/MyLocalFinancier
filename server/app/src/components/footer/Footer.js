import React from 'react'
import {makeStyles} from '@material-ui/core'
import {GitHub, Mail, Web, Telegram, Instagram} from '../layout/Icons/footerIcons'

const useStyles = makeStyles(theme => ({
    footerContainer: {
        padding: 10,
        height: '64px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100wv',
        backgroundColor: 'rgba(44, 48, 44,0.8)'
    },
    footerContacts: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    link: {
        marginRight: 5
    },
    copyright: {
        fontSize: '12px',
        [theme.breakpoints.up('xsm')]: {
            fontSize: '1rem'
        }
    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.footerContainer}>
            <div className={classes.copyright}>
                My Local Financier 2020 &copy; <br/>
                All rights reserved
            </div>
            <div className={classes.footerContacts}>
                <div>
                    <a className={classes.link} href="https://github.com/SerjLeo" target="_blank">
                        <GitHub/>
                    </a>
                    <a className={classes.link} href="https://github.com/SerjLeo" target="_blank">
                        <Web/>
                    </a>
                    <a className={classes.link} href="https://github.com/SerjLeo" target="_blank">
                        <Telegram/>
                    </a>
                    <a className={classes.link} href="https://github.com/SerjLeo" target="_blank">
                        <Instagram/>
                    </a>
                </div>
                <div>
                    serjleodev@gmail.com
                </div>
            </div>
        </div>
    )
}

export default Footer
