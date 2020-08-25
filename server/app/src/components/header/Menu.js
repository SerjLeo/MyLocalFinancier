import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {IconButton, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu'

import {CustomLink} from '../utils/CustomLink'
import menuLinks from './menuLinks'
import WithTranslation from "../translation/withTranslationHOC";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  title: {
    margin: '10px 0 10px 20px'
  }
});

function Menu({strings}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    setOpen(!open);
  };

  const {menu, analytics} = menuLinks;

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={e => toggleDrawer(e)}
      onKeyDown={e => toggleDrawer(e)}
    >
      <Typography variant='h6' className={classes.title}>
        {strings.title}
      </Typography>
      <Divider />
      <List>
        {menu.map(item => (
          <CustomLink to={item.link} key={item.text}>
            <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={strings[item.text]} />
            </ListItem>
          </CustomLink>
        ))}
      </List>
      <Typography variant='h6' className={classes.title}>
        {strings.analytics}
      </Typography>
      <Divider />
      <List>
        {analytics.map(item => (
          <CustomLink to={item.link} key={item.text}>
            <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={strings[item.text]} />
            </ListItem>
          </CustomLink>
        ))}
      </List>

    </div>
  );

  return (
    <div>
      <IconButton color="inherit" style={{marginRight: 10}} aria-label="Menu" onClick={e => toggleDrawer(e)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={e => toggleDrawer(e)}>
        {sideList()}
      </Drawer>
    </div>
  );
}

export default WithTranslation(Menu)
