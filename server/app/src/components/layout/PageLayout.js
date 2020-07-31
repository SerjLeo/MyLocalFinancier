import React from 'react'
import {Container, Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => {
    console.log(theme)
    return {
        pageContainer: theme.commonStyles.pageContainer,
        pageWrapper: {
            padding: 30,
            [theme.breakpoints.down('xs')]:{
                padding: 15
            },
            backgroundColor: 'rgba(44, 48, 44, 0.95)',
            minHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative'
        }
    }
})
const PageLayout = ({containerSize = 'lg', wrap = true, bgc, children}) => {
    const classes = useStyles();
    return (
        <div className={classes.pageContainer} style={bgc?{backgroundColor:bgc}:null}>
            <Container maxWidth={containerSize}>
                {wrap?<Paper className={classes.pageWrapper}>{children}</Paper>:<>{children}</>}
            </Container>
        </div>
    )
}

export default PageLayout
