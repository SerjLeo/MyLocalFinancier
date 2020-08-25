import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {makeStyles} from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MomentUtils from '@date-io/moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import WithTranslation from "../../translation/withTranslationHOC";
import {months} from "./selectFieldsData";
import {InputLabel} from "@material-ui/core";

const useStyles = makeStyles({
    panel: {
        display: "flex",
        flexDirection: props => props.isWide?'column':'row',
        width: '100%'
    },
    selectFormControl: {
        minWidth: 150,
        marginRight: 20
    },
    timePanel: {
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    selectPanel: {
        display: "flex",
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: "flex-start",
        marginBottom: 10
    },
    filtersContainer: {
        display: "flex",
        flexDirection: props => props.isWide?'row':'column',
        marginBottom: 10,
        width: '100%'
    },
    smallSelect: {
        maxWidth: 120
    }
})

const AnalyticsFilters = ({
    strings,
    categories,
    incomes,
    onChange,
    changeEndDate,
    changeStartDate,
    filters,
    isWide = true,
    showCategoryFilters,
    showIncomeFilters,
    singleCurrency
}) => {
    const classes = useStyles({isWide})
    const {currency, type, timePeriod, month, year, startDate, endDate, income, category} = filters
    return (
        filters
            ?<Grid container className={classes.filtersContainer}>
                <Grid item xs={12} sm={isWide?4:12} md={isWide?3:12} className={classes.panel}>
                    {currency && !singleCurrency
                        ?<FormControl>
                            <FormLabel component="legend">{strings.currency}</FormLabel>
                            <RadioGroup row={true} aria-label="currency" name="currency" value={currency} onChange={onChange}>
                                <FormControlLabel value="USD" control={<Radio color='default' classes={{root: classes.greenRadio}}/>} label="USD" />
                                <FormControlLabel value="EUR" control={<Radio color='default' classes={{root: classes.blueRadio}}/>} label="EUR" />
                                <FormControlLabel value="RUB" control={<Radio color='default' classes={{root: classes.yellowRadio}}/>} label="RUB" />
                            </RadioGroup>
                        </FormControl>
                        :null
                    }
                    {type !== undefined
                        ?<FormControl>
                            <FormLabel component="legend">{strings.type}</FormLabel>
                            <RadioGroup row={true} aria-label="type" name="type" value={Number(type)} onChange={onChange}>
                                <FormControlLabel value={1} control={<Radio color='primary'/>} label="+" />
                                <FormControlLabel value={0} control={<Radio color='secondary'/>} label="-" />
                            </RadioGroup>
                        </FormControl>
                        :null
                    }
                </Grid>
                <Grid item xs={12} sm={isWide?5:12} md={isWide?6:12} className={classes.timePanel}>
                    {timePeriod
                        ?<FormControl style={{marginBottom: 10}}>
                            <FormLabel component="legend">{strings.timePeriod}</FormLabel>
                            <RadioGroup row={true} aria-label="timePeriod" name="timePeriod" value={timePeriod} onChange={onChange}>
                                <FormControlLabel value="month" control={<Radio color='default'/>} label={strings.month} />
                                <FormControlLabel value="year" control={<Radio color='default'/>} label={strings.year} />
                                <FormControlLabel value="all" control={<Radio color='default'/>} label={strings.allTime} />
                                <FormControlLabel value="custom" control={<Radio color='default'/>} label={strings.customPeriod} />
                            </RadioGroup>
                        </FormControl>
                        :null
                    }
                    <div className={classes.selectPanel}>
                        {timePeriod === 'month'
                            ?<FormControl className={classes.selectFormControl}>
                                <FormLabel component="legend">{strings.month}</FormLabel>
                                <Select
                                    name='month'
                                    value={month}
                                    onChange={onChange}
                                >
                                    {months.map(m => <MenuItem value={m.value} key={m.label}>{strings.months[m.label]}</MenuItem>)}
                                </Select>
                            </FormControl>
                            :null
                        }
                        {timePeriod === 'month' || timePeriod === 'year'
                            ?<FormControl className={classes.selectFormControl}>
                                <FormLabel component="legend">{strings.year}</FormLabel>
                                <Select
                                    name='year'
                                    value={year}
                                    onChange={onChange}
                                >
                                    <MenuItem value={2019}>2019</MenuItem>
                                    <MenuItem value={2020}>2020</MenuItem>
                                </Select>
                            </FormControl>
                            :null
                        }
                        {timePeriod === 'custom'
                            ?<MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    style={{marginRight: 20}}
                                    format="DD/MM/yyyy"
                                    name="startDate"
                                    label={strings.from}
                                    value={startDate}
                                    onChange={changeStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    style={{marginRight: 20}}
                                    format="DD/MM/yyyy"
                                    name="endDate"
                                    label={strings.to}
                                    value={endDate}
                                    onChange={changeEndDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            :null
                        }
                    </div>
                </Grid>
                {showCategoryFilters || showIncomeFilters
                    ?<Grid item xs={12} sm={isWide?3:12} md={isWide?3:12} className={classes.timePanel}>
                            <FormLabel component="legend">{strings.timePeriod}</FormLabel>
                            {categories && showCategoryFilters
                                ?<FormControl style={{width: 120}}>
                                    <InputLabel htmlFor="type-simple">{strings.category}</InputLabel>
                                    <Select
                                        onChange={onChange}
                                        name='category'
                                        value={category}
                                    >
                                        <MenuItem key={0} value=''>
                                            {strings.all}
                                        </MenuItem>
                                        {categories.map(item =>
                                            <MenuItem key={item._id} value={item._id} style={{backgroundColor: item.color}}>
                                                {item.title}
                                            </MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                :null
                            }
                            {incomes && showIncomeFilters
                                ?<FormControl style={{width: 120}}>
                                    <InputLabel htmlFor="type-simple">{strings.income}</InputLabel>
                                    <Select
                                        onChange={onChange}
                                        name='income'
                                        value={income}
                                    >
                                        <MenuItem key={0} value=''>
                                            {strings.all}
                                        </MenuItem>
                                        {incomes.map(item =>
                                            <MenuItem key={item._id} value={item._id} style={{backgroundColor: item.color}}>
                                                {item.title}
                                            </MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                :null
                            }
                        </Grid>
                        :null
                }
            </Grid>
            :null
    );
};

export default WithTranslation(AnalyticsFilters);
