import React from 'react'
import {Container, Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.pageContainer,
    pageWrapper: {
        padding: 30,
        [theme.breakpoints.down('xs')]:{
            padding: 5
        },
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
}))
const PageLayout = ({containerSize = 'lg', wrap = true, children}) => {
    const classes = useStyles();
    return (
        <div className={classes.pageContainer}>
            <Container maxWidth={containerSize}>
                {wrap?<Paper className={classes.pageWrapper}>{children}</Paper>:<>{children}</>}
            </Container>
        </div>
    )
}

export default PageLayout
