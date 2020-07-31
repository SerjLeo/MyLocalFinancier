import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import { Card, CardHeader, Grid, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Button, Typography } from '@material-ui/core'
import getCategoriesIcon from '../../layout/Icons/categoriesIcons'

const useStyles = makeStyles({
    media: {
        height: 140,
    },
    container: {
        margin: 10
    },
    balance: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
});

const CategoryDashboardCard = ({title, icon, color, id}) => {

    const [redirect, setRedirect] = useState(false)
    const classes = useStyles();
    let Icon = getCategoriesIcon(icon)
    const iconProps = {
        fontSize: 'large'
    }

    if(redirect){
        return <Redirect to={`/categories/${id}`}/>
    }
    return (
        <Grid item xs={6} sm={6} md={4}>
            <Card className={classes.container}>
                <CardActionArea style={{backgroundColor: color}} onClick={() => setRedirect(true)}>
                    <CardHeader
                        title={title}
                    />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={6}>
                                {Icon(iconProps)}
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
