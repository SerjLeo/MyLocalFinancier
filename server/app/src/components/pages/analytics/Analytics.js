import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Card, Grid, CardActionArea, CardContent, makeStyles, Typography} from '@material-ui/core'
import CategoryIcon from '@material-ui/icons/Category';
import PaymentIcon from '@material-ui/icons/Payment';
import PageLayout from "../../layout/PageLayout";
import WithTranslation from "../../translation/withTranslationHOC";

const useStyles = makeStyles({
    media: {
        height: 140,
    },
    container: {
        height: '80vh'
    },
    item: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    cardContainer: {
        margin: 10,
        width: '100%',
        height: 200,
        borderRadius: 15
    },
    cardActionArea: {
      height: '100%'
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        transition: '0.5s all ease',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
});

const Analytics = ({strings}) => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false)
    const [to, setTo] = useState('')

    const redirectTo = to => {
        setTo(to)
        setRedirect(true)
    }

    if(redirect) {
        return <Redirect push to={`analytics/${to}`}/>
    }
    return (
        <PageLayout wrap={false}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item className={classes.item} xs={12} sm={6}>
                    <Card className={classes.cardContainer} style={{backgroundColor: '#ffa726'}}>
                         <CardActionArea className={classes.cardActionArea} onClick={() => redirectTo('incomes')}>
                            <CardContent className={classes.cardContent}>
                                <PaymentIcon style={{fontSize: '100px', marginBottom: 10}}/>
                                <Typography variant="h5">{strings.incomes}</Typography>
                             </CardContent>
                         </CardActionArea>
                     </Card>
                </Grid>
                <Grid item className={classes.item} xs={12} sm={6}>
                    <Card className={classes.cardContainer} style={{backgroundColor: '#689f38'}}>
                        <CardActionArea className={classes.cardActionArea} onClick={() => redirectTo('categories')}>
                            <CardContent className={classes.cardContent}>
                                <CategoryIcon style={{fontSize: '100px', marginBottom: 10}}/>
                                <Typography variant="h5">{strings.categories}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </PageLayout>
    )
}

export default WithTranslation(Analytics)
