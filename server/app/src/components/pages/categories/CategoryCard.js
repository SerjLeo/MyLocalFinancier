import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Button, Typography } from '@material-ui/core'
import { CustomLink } from '../../utils/CustomLink';

const useStyles = makeStyles({
    media: {
      height: 140,
    },
    balance: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
});

const CategoryCard = ({title, icon, color, id}) => {

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6}>
        <Card>
            <CardActionArea style={{backgroundColor: color}}>
                <CardMedia
                className={classes.media}
                >    
                    <i className={icon?icon:"fas fa-plus fa-lg"} style={{heigth:'200px', width:'200px'}}/>
                </CardMedia>
                <CardContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <CustomLink to={`/incomes/${id}`}>
                    <Button size="small" color="primary">
                    Inspect
                    </Button>
                </CustomLink>
            </CardActions>
        </Card>
    </Grid>
  );
}

CategoryCard.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    balance: PropTypes.number,
    currency: PropTypes.string,
    color: PropTypes.string
}

export default CategoryCard