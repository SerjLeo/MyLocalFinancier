import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import WithTranslation from "../translation/withTranslationHOC";

const useStyles = makeStyles({
    container: {
        width: '100%'
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 10
    },
    inputRoot: {
        '& label': {
            '& svg': {
                paddingBottom: 5
            }
        }
    },
    selectForm: {
        minWidth: 250
    }
})

const Searchbar = ({
    onChange,
    categories = null,
    incomes = null,
    search = false,
    filters,
    strings,
    categoryFilters,
    incomeFilters
 }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.toolbar}>
                {incomes && incomeFilters
                    ?<FormControl style={{width: 200, margin: '0 10px'}}>
                        <InputLabel htmlFor="type-simple">{strings.incomes}</InputLabel>
                        <Select
                            onChange={e => onChange(e)}
                            name='income'
                            value={filters.income}
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
                {categories && categoryFilters
                    ?<FormControl style={{width: 200, margin: '0 10px'}}>
                        <InputLabel htmlFor="type-simple">{strings.categories}</InputLabel>
                        <Select
                            onChange={e => onChange(e)}
                            name='category'
                            value={filters.category}
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
                {search
                    ?<TextField
                        onChange={e => onChange(e)}
                        classes={{
                            root: classes.inputRoot
                        }}
                        label={<SearchIcon/>}
                        type="text"
                        name="search"
                        value={filters.search}
                        style={{width: 200, margin: '0 10px'}}
                    />
                    :null
                }
            </div>
            <Divider style={{marginBottom: 5}}/>
        </div>
    );
};

export default WithTranslation(Searchbar);
