import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Grid, CardActionArea, CardContent, makeStyles, Typography} from '@material-ui/core'
import getIncomeIcon from '../../layout/Icons/incomeIcons'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles( {
    media: {
        height: 80,
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
    financeInfo: {
        display: "flex"
    },
    titleText: {
        padding: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "right"
    }
})

const IncomeDashboardCard = ({income, isWide}) => {
    const [redirect, setRedirect] = useState(false)
    const {icon, balance, title, color, currency, _id} = income
    const classes = useStyles();
    let Icon = getIncomeIcon(icon)
    const iconProps = {
        fontSize: 'large',
        style: {
            fontSize: isWide?'2.5rem':'4rem'
        }
    }

    if(redirect){
        return <Redirect push to={`/incomes/${_id}`}/>
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
                            <Grid item xs={8} className={classes.balance}>
                                <Typography
                                    variant='h5'
                                    className={classes.titleText}
                                >{title}</Typography>
                                <div className={classes.financeInfo} style={{
                                    flexDirection: isWide?'column':'row',
                                    alignItems: isWide?"flex-end":"center"
                                }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {balance.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" style={{paddingLeft:isWide?0:10}} color="textSecondary" component="p">
                                        {currency}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

IncomeDashboardCard.propTypes = {
    income: PropTypes.object,
    isWide: PropTypes.bool
}

export default IncomeDashboardCard
