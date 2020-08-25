import React from 'react';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import WithTranslation from "../../translation/withTranslationHOC";

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent:"center",
        flexDirection: 'column',
        alignItems:"center",
        textAlign: "center",
        width: '100%'
    }
})

const EmptyData = ({strings}) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <InsertChartIcon style={{fontSize: 50}}/>
            <Typography variant='h5'>{strings.empty}</Typography>
        </div>
    );
};

export default WithTranslation(EmptyData)
