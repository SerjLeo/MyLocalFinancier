import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import getCategoriesIcon from "../layout/Icons/categoriesIcons";

const useStyles = makeStyles({
    paper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
        justifyContent: "center",
        alignItems: "center",
        width: "320px",
        height: "320px"
    },
    selected: {
        height: 30
    },
    menuItemRoot: {
        width: '100%',
        height: '100%',
        margin: '0 auto',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    }
})

const IconPicker = ({field, onChange, xs, sm, md, lg, index, label}) => {
    const classes = useStyles()
    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} key={(index + 'icons')}>
            <FormControl fullWidth>
                <InputLabel htmlFor="type-simple">{label}</InputLabel>
                <Select
                    value={field.value}
                    name={field.name}
                    classes={{
                        select: classes.selected
                    }}
                    onChange={e => onChange(e)}
                    MenuProps={{
                        classes: {
                            paper: classes.paper,
                            list: classes.list
                        }
                    }}
                >
                    {field.menuItems.map(item => <MenuItem key={(item._id + 'icon')} value={item.value} classes={{
                        root: classes.menuItemRoot
                    }}>
                        {getCategoriesIcon(item.value)()}
                    </MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default IconPicker;

