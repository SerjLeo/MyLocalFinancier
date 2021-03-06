import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    widgets: {
        [theme.breakpoints.up('sm')]:{
            display: 'none'
        }
    }
}))

function Widgets(props) {
    const classes = useStyles()
    return (
        <div className={classes.widgets}>
            Widgets
        </div>
    );
}

export default Widgets;
