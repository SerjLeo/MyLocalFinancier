import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography, CardHeader, IconButton } from '@material-ui/core'
import getIncomeIcon from '../../../layout/Icons/incomeIcons'
import {Redirect} from 'react-router-dom'

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

const IncomeCard = ({type, icon, balance, title, color, currency, id}) => {
  const [redirect, setRedirect] = useState(false)
  const classes = useStyles();
  let Icon = getIncomeIcon(icon)
  const iconProps = {
      fontSize: 'large'
  }

  if(redirect){
    return <Redirect to={`/incomes/${id}`}/>
  }
  return (
    <Grid item xs={6}>
        <Card className={classes.container}>
            <CardActionArea style={{backgroundColor: color}} onClick={() => setRedirect(true)}>
                <CardHeader
                    // action={
                    //     Icon(iconProps)
                    // }
                    title={title}
                    subheader={type}
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            {Icon(iconProps)}
                        </Grid>
                        <Grid item xs={6} className={classes.balance}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {balance.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {currency}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <CustomLink to={`/incomes/${id}`}>
                    <Button size="small" color="primary">
                    Inspect
                    </Button>
                </CustomLink>
            </CardActions> */}
        </Card>
    </Grid>
  );
}

IncomeCard.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    balance: PropTypes.number,
    currency: PropTypes.string,
    color: PropTypes.string
}

export default IncomeCard