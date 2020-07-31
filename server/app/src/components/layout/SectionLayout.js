import React from 'react'
import {Typography, Paper, makeStyles} from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Info from "../helpers/Info";

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

const SectionLayout = ({children, title, infoText, collapse = false}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Paper className={classes.section}>
            {title?<Typography variant="h5" className={classes.title}>{title}</Typography>:null}
            <Info text={infoText}/>
            {collapse?<>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div className={classes.content}>{children}</div>
                </Collapse>
            </>
            :<div className={classes.content}>{children}</div>
        }</Paper>
    )
}

export default SectionLayout
