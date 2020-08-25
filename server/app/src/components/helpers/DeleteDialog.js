import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, Switch, Container, Grid, Button, Typography} from '@material-ui/core';
import WithTranslation from "../translation/withTranslationHOC";

const useStyles = makeStyles({
    button: {
        padding: 10
    },
    switchPanel: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }
})

function DeleteDialog({strings, onClose, open, onDelete, loading, type}) {
    const classes = useStyles()
    const [deleteRelative, setDeleteRelative] = React.useState(false);

    const handleChange = event => setDeleteRelative(event.target.checked)

    return (
        <Dialog onClose={onClose} open={open}>
            <Container maxWidth='md' justify='center' align='center' style={{padding: '10px'}}>
                <Grid container>
                    <Grid item xs={12} style={{padding: 10}}>
                        <Typography gutterBottom variant="h4">{strings[`${type}Title`]}</Typography>
                    </Grid>
                    {type === 'income'
                        ?<Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} className={classes.switchPanel}>
                                    <Switch
                                        checked={deleteRelative}
                                        onChange={handleChange}
                                        value="deleteExpenses"
                                        color="primary"
                                    />
                                    <Typography variant='h5'>
                                        {strings.deleteRelative}
                                    </Typography>
                                </Grid>
                                <Grid item xs ={12}>
                                    <Typography variant='subtitle1'>
                                        {strings.deleteIncomeDescription}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        :null
                    }
                    {type === 'category'
                        ?<Grid item xs ={12}>
                            <Typography variant='subtitle1'>
                                {strings.deleteCategoryDescription}
                            </Typography>
                        </Grid>
                        :null
                    }
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={6} className={classes.button}>
                                <Button
                                    fullWidth
                                    onClick={() => onDelete(deleteRelative)}
                                    color="secondary"
                                    disabled={loading}
                                >
                                    {strings.delete}
                                </Button>
                            </Grid>
                            <Grid item xs={6} className={classes.button}>
                                <Button
                                    fullWidth
                                    onClick={onClose}
                                >
                                    {strings.cancel}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    )
}

export default WithTranslation(DeleteDialog)
