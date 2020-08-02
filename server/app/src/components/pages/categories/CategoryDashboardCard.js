import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Card, Grid, CardActionArea, CardContent, makeStyles, Typography} from '@material-ui/core'
import getCategoriesIcon from '../../layout/Icons/categoriesIcons'

const useStyles = makeStyles({
    media: {
        height: 140,
    },
    container: {
        margin: 10
    },
    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    balance: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    title: {
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
});

const CategoryDashboardCard = ({title, icon, color, id, isWide}) => {

    const [redirect, setRedirect] = useState(false)
    const classes = useStyles();
    let Icon = getCategoriesIcon(icon)
    const iconProps = {
        fontSize: 'large',
        style: {
            fontSize: isWide?'2.5rem':'4rem'
        }
    }
    if(redirect){
        return <Redirect to={`/categories/${id}`}/>
    }
    return (
        <Grid item xs={isWide?6:12}>
            <Card className={classes.container}>
                <CardActionArea style={{backgroundColor: color}} onClick={() => setRedirect(true)}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={4} className={classes.icon}>
                                {Icon(iconProps)}
                            </Grid>
                            <Grid item xs={8} className={classes.title}>
                                <Typography
                                    variant="h5"
                                    className={classes.titleText}
                                >{title}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

CategoryDashboardCard.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    balance: PropTypes.number,
    currency: PropTypes.string,
    color: PropTypes.string
}

export default CategoryDashboardCard
