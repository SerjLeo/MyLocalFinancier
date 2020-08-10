import React from 'react'

import {TextField, Paper, Grid, Button, Typography, FormControl, Switch, InputLabel, MenuItem, Select} from '@material-ui/core';
import {CustomLink} from '../utils/CustomLink'
import {makeStyles} from '@material-ui/core/styles';
import WithTranslation from '../translation/withTranslationHOC'
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        display: 'flex',
        flexWrap: 'wrap'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form = ({
    onSubmit,
    onChange,
    direction,
    fields,
    type,
    title = true,
    hasBackBtn = false,
    goBack,
    color = 'rgba(44, 48, 44,0.8)',
    strings,
    redirectTo,
    showTitle = true,
    elevation = 1,
    breakpoints = {
        sm: false,
        xs: 12,
        md: false,
        lg: false
    }
    }) => {

    const classes = useStyles();
    
    const {sm,xs,md,lg} = breakpoints
    
    strings = Object.entries(strings).filter(item => item[0] === type).reduce((flattenArray, element) => {
        return Array.isArray(element)
        ? [...flattenArray, ...element]
        : [...flattenArray, element]
    },[])[1]

    return (fields?(
        <Paper className={classes.paper} style={{backgroundColor: color}} elevation={elevation}>
            {title && showTitle?<Typography variant="h4" style={{paddingTop: '40px'}}>
                {strings.titleText}
            </Typography>:null}
            <form className={classes.form} onSubmit={e => onSubmit(e)} autoComplete="off" style={{flexDirection: direction}}>
                <Grid container spacing={2} style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    {fields.map((field, index) => {
                        const label = Object.entries(strings).filter(item => item[0] === field.name).reduce((flattenArray, element) => {
                            return Array.isArray(element)
                            ? [...flattenArray, ...element]
                            : [...flattenArray, element]
                        },[])[1]

                        switch(field.type) {
                            case 'select':
                                return <Grid item xs={xs} sm={sm} md={md} lg={lg} key={index}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="type-simple">{label}</InputLabel>
                                                <Select
                                                value={field.value}
                                                name={field.name}
                                                onChange={e => onChange(e)}
                                                >
                                                {field.menuItems.map(item => <MenuItem key={item._id} value={item.value || item}>
                                                    {item.title}
                                                </MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                            case 'iconSelect':
                                return <IconPicker
                                    field={field}
                                    label={label}
                                    xs={xs}
                                    sm={sm}
                                    md={md}
                                    lg={lg}
                                    onChange={onChange}
                                    key={index}
                                />
                            case 'colorSelect':
                                return <ColorPicker
                                    field={field}
                                    label={label}
                                    xs={xs}
                                    sm={sm}
                                    md={md}
                                    lg={lg}
                                    onChange={onChange}
                                    key={index}
                                />
                            case 'switch':
                                return <Grid item xs={xs} sm={sm} md={md} lg={lg} key={index}>
                                    <Switch
                                        value={field.value}
                                        name={field.name}
                                        onChange={e => onChange(e)}
                                    />
                                </Grid>
                            case 'textInput':
                                return <Grid item xs={xs} sm={sm} md={md} lg={lg} key={index}>
                                            <TextField
                                                required
                                                fullWidth
                                                variant="outlined"
                                                onChange={e => onChange(e)}
                                                margin="normal"
                                                label={label}
                                                type={field.inputType}
                                                helperText={field.helperText}
                                                name={field.name}
                                                value={field.value}
                                                multiline={field.multiline}
                                            />
                                        </Grid>
                            default:
                                return null
                        }
                    })}
                </Grid>
                {hasBackBtn
                        ?<Grid container>
                            <Grid item xs={6} style={{paddingRight: '10px'}}>
                                <Button
                                    fullWidth
                                    onClick={() => goBack()}
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.submit}
                                >
                                    {strings.backButtonText}
                                </Button>
                            </Grid>
                            <Grid item xs={6} style={{paddingLeft: '10px'}}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    {strings.buttonText}
                                </Button>
                            </Grid>   
                    </Grid>
                    :<Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                    >
                        {strings.buttonText}
                    </Button>}                        
                {redirectTo && strings && strings.redirectText
                ?(<Grid container justify='center' alignItems='center'>
                    <Grid item>
                    <CustomLink to={redirectTo} variant="body2">
                        {strings.redirectText}
                    </CustomLink>
                    </Grid>
                </Grid>)
                :null}
            </form>
        </Paper>
    ):null)
}

export default WithTranslation(Form)
