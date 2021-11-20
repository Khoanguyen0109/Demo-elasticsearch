import { Drawer, Icon, IconButton } from '@mui/material'
import { withStyles } from '@mui/styles';
import React, { useState } from 'react'
import styles from './styled';
import clsx from 'clsx'
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import routes from '../../routes/routes';
import { useHistory, useLocation } from 'react-router';
import { isArray } from 'lodash-es';

function Sidebar(props) {
  const { classes,className,  openSideBar, toggleSidebar, ...rest } = props;
  const history = useHistory()
  const location = useLocation()
  const getPath = (item) => {
    return isArray(item.path) && !!item.path.length ? item.path[0] : item.path;
  }
  const handleClickMenu  = (item, selected) => {
    // if (selected) {
    //   return;
    // }
    const path = getPath(item);
    history.push(path);

  }
  console.log('openSidebar', openSideBar)

    return (
        <Drawer
        open={openSideBar}
        anchor='left'
        {...rest}
        classes={{
          root: classes.root,
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: openSideBar,
            [classes.drawerClose]: !openSideBar,
          }),
        }}
        variant='permanent'
        onClose={toggleSidebar}
      >
        <Box display='flex' alignItems='center' justifyContent='center' className={classes.tblLogo}>
          <Box display='flex' mt={1}>
            {openSideBar ? "Logo" : "L"} 
          </Box>
          <Box>

            
            {/* <IconButton
              onClick={toggleSidebar}
              className={clsx(classes.iconButton, {
                [classes.iconButtonOpen]: openSideBar,
              })}
            >
              <Icon
                className={openSideBar ? 'icon-icn_arrow_left' : 'icon-icn_arrow_right'}
              />
            </IconButton> */}
          </Box>
        </Box>
        <List className={className}>
        {routes.map((item, index) => {
              if(item.menu){

                const MenuIcon = item.menu.icon;
                const pathname = location.pathname?.split('/');
                const path = getPath(item);
                const selected = path?.includes(pathname[1]);
                console.log(`slected`, selected)
            const { title} = item.menu;
            return <ListItem button key={index} onClick={() => handleClickMenu(item, selected)} selected={selected}>
            {typeof MenuIcon === 'string' ?
                <Icon className={item.menu.icon} />
                :
                <MenuIcon />
              }
            <ListItemText primary={title} />
          </ListItem>
          }
          return;
        }
        )}
      </List>
        {/* <UserMenu routes={routes} closeSidebar={this.closeSidebar} openSideBar={openSideBar} /> */}
      </Drawer>
    )
}

export default withStyles(styles)(Sidebar);
