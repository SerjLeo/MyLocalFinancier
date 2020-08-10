import React from 'react'
import {Typography, Paper, makeStyles} from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Info from "../helpers/Info";
import InterfaceStateService from "../../services/interfaceStateService";

const useStyles = makeStyles(theme => ({
    title: {
        paddingBottom: 10
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10
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
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center"
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
}))

const SectionLayout = ({children, interfaceName, title, infoText, collapse = false, addForm, noPadding = false}) => {
    const classes = useStyles();
    const interfaceStateService = new InterfaceStateService()
    const [expanded, setExpanded] = React.useState(false);
    React.useEffect(() => {
        if(interfaceName) {
            setExpanded(interfaceStateService.getProperty(interfaceName))
        }
    })
    const handleExpandClick = () => {
        if(interfaceName) {
            interfaceStateService.setProperty(interfaceName, !expanded)
        }
        setExpanded(!expanded);
    };
    const AddForm = addForm
    return (
        <Paper className={classes.section}>
            <div className={classes.header}>
                {title?<Typography variant="h5" style={{padding: '0 10px'}} className={classes.title}>{title}</Typography>:null}
                <div className={classes.toolbar}>
                    {addForm?<AddForm/>:null}
                    {collapse?
                        <IconButton
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>:null
                    }
                    {infoText?<Info text={infoText}/>:null}
                </div>
            </div>
            {collapse?
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.content} style={{padding: noPadding?0:null}}>{children}</div>
            </Collapse>
            :<div className={classes.content} style={{padding: noPadding?0:null}}>{children}</div>
        }</Paper>
    )
}

export default SectionLayout
