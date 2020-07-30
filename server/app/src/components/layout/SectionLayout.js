import React from 'react'
import {Typography, Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    title: {
        paddingBottom: 10
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    section: {
        padding: 20,
        [theme.breakpoints.down('xs')]:{
            padding: 10
        },
        backgroundColor: 'rgba(44, 48, 44,0.95)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        marginTop: 10,
        marginBottom: 10
    },
}))

const SectionLayout = ({children, title}) => {
    const classes = useStyles();
    return (
        <Paper className={classes.section}>
            {title?<Typography variant="h5" className={classes.title}>{title}</Typography>:null}
            <div className={classes.content}>{children}</div>
        </Paper>
    )
}

export default SectionLayout
