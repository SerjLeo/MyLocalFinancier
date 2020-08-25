import React from 'react'
import {Container, Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.pageContainer,
    pageWrapper: theme.commonStyles.pageWrapper
}))

const PageLayout = ({containerSize = 'lg', wrap = true, bgc='rgba(255,255,255,0.1)', children, justify="flex-start"}) => {
    const classes = useStyles();
    return (
        <div className={classes.pageContainer} style={{justifyContent: justify, backgroundColor:bgc}}>
            <Container maxWidth={containerSize}>
                {wrap?<Paper className={classes.pageWrapper}>{children}</Paper>:<>{children}</>}
            </Container>
        </div>
    )
}

export default PageLayout
