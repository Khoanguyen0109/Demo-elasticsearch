import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import routes from '../routes/routes';
import { Icon } from '@mui/material';
import { useHistory, useLocation } from 'react-router';
import { isArray } from 'lodash-es';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthDataContext } from '../Auth/AuthContext';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    minHeight: '100vh',
    width: '100vw',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      width: `calc(100vw - ${drawerWidth}px)`,
      
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState((localStorage.getItem('openSideBarStatus') || 'true') === 'true');
  const history = useHistory();
  const location = useLocation()
  const authContext = React.useContext(AuthDataContext)
  const {currentUser} = authContext;
  const getPath = (item) => {
    return isArray(item.path) && !!item.path.length ? item.path[0] : item.path;
  }
  const handleClickMenu = (item, selected) => {
    // NOTE: Fixed TL-3201
    // LINK: https://communicate.atlassian.net/browse/TL-3201
    // SOLUTION: Prevent click menu when it was selecting
    if (selected) {
      return;
    }
    const path = getPath(item);
    history.push(path);
  }

  const toggleSidebar = () => {
    setOpen(!open);
    localStorage.setItem('openSideBarStatus', !open);
  };

 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box       sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography variant="h6" noWrap component="div">
            Documents management
          </Typography>
          <Box>
          <Typography>
            
          </Typography>
          <IconButton sx ={{
            color: 'white'
          }}>
            <LogoutIcon/>
          </IconButton>
          </Box>
         
          </Box>
       
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={toggleSidebar}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((item ,index) => {
            if(item.menu){
              const MenuIcon = item.menu.icon;
              const pathname = location.pathname?.split('/');
              const path = getPath(item);
              const selected = path?.includes(pathname[1]);
              return <ListItem button key={index} onClick={() => handleClickMenu(item, selected)} selected={selected}>
                {item.menu.icon &&
                  <ListItemIcon>
                      {typeof MenuIcon === 'string' ?
                        <Icon className={item.menu.icon} />
                        :
                        <MenuIcon />
                      }
                  </ListItemIcon>
                }
                <ListItemText primary={item.menu.title} />
              </ListItem>;
            }
          })}
        </List>
        <Divider />
  
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Box></Box> */}
        <Box>
        {props.children}

        </Box>
      </Main>
    </Box>
  );
}
