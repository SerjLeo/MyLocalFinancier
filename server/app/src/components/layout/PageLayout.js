import React from 'react'
import {Container, Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => {

    return {
        pageContainer: theme.commonStyles.pageContainer,
        pageWrapper: theme.commonStyles.pageWrapper
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
