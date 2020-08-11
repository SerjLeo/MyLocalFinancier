import React from 'react'

import {TextField, Grid, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import WithTranslation from '../translation/withTranslationHOC'
import TransactionTypeSwitch from "./TransactionTypeSwitch";
import SmallSelect from "./SmallSelect";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px 40px 40px',
        width: '100%'
    },
    form: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    gridRow: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddTransactionForm = ({
    onSubmit,
    onChange,
    direction,
    income,
    incomes,
    category,
    categories,
    title,
    amount,
    loading = true,
    strings
  }) => {
    const classes = useStyles();
    const isSmall = useMediaQuery('(max-width:480px)');
    const isMedium = useMediaQuery('(min-width:620px) and (max-width:960px)')
    return <form className={classes.form} onSubmit={e => onSubmit(e)} autoComplete="off" style={{flexDirection: direction}}>
                <Grid container direction="row" justify='space-around'>
                    <Grid item xs={isSmall?12:4} sm={12} md={4}>
                        <Grid container direction={(isSmall||isMedium)?'row':'column'} className={classes.gridRow}>
                            <Grid item>
                                <TransactionTypeSwitch
                                    onChange={onChange}
                                    name='type'
                                />
                            </Grid>
                            <Grid item style={{display: 'flex', flexDirection: 'row'}}>
                                <SmallSelect name='income' label={strings.income} value={income} menuItems={incomes} onChange={onChange}/>
                                <SmallSelect name='category' label={strings.category} value={category} menuItems={categories} onChange={onChange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={isSmall?12:8} sm={12} md={8}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            onChange={e => onChange(e)}
                            margin="normal"
                            label={strings.title}
                            type="text"
                            name="title"
                            value={title}
                       />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            onChange={e => onChange(e)}
                            margin="normal"
                            label={strings.amount}
                            type="number"
                            inputProps={{
                                max: 999999,
                                min: 0
                            }}
                            name="amount"
                            value={amount}
                        />
                        {income
                            ?<div>{strings.currentBalance}{' '}{Number(income.balance).toFixed(2)}{' '}{income.currency}</div>
                            :null
                        }
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                >
                    {strings.buttonText}
                </Button>

            </form>
}

export default WithTranslation(AddTransactionForm)
