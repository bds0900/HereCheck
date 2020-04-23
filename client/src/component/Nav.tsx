import React, { Fragment, ReactElement } from 'react'
import { AppBar, Tabs, Tab, Box,Typography,makeStyles,Breadcrumbs,Chip, Button, Icon, Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Role, FacultyType } from './Interfaces';


import {  } from '@material-ui/core'
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import QueueOutlinedIcon from '@material-ui/icons/QueueOutlined';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

interface Props {
  history:any
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}



const useStyles = makeStyles((theme) => ({
  root:{
    textDecoration:'none',
    display: 'flex',
  },
  avtive: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    textDecoration:'none'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0',
    marginLeft: '5px',
    ...theme.mixins.toolbar,
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,

  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  sidebarIcon: {
    height: 24,
  }
}));

const drawerWidth = 240;


const Nav = (props: Props):ReactElement => {
    const classes = useStyles();
    const role=localStorage.getItem("role");

    const handleLogout =  () => {
      props.userHasAuthenticated(false);

      localStorage.clear()
    }

    return (
    role==Role.SUPERADMIN
        ?
        <div>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/home">        
            <ListItemIcon className={classes.sidebarIcon}>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/programs">        
            <ListItemIcon className={classes.sidebarIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Programs" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/courses"> 
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/students">     
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/faculties">  
            <ListItemIcon>
              <PeopleAltTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Faculty" />
          </ListItem>
          <Divider />
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/create/program">
            <ListItemIcon>
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Program" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/create/course">  
            <ListItemIcon>
              <QueueOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Course" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/create/student">  
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Student" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/create/faculty">
            <ListItemIcon>
              <GroupAddTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Add Faculty" />
          </ListItem>
        </div>

        :

    role==Role.ADMIN
        ?
        <div>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/home">        
            <ListItemIcon className={classes.sidebarIcon}>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/programs">        
            <ListItemIcon className={classes.sidebarIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Programs" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/courses"> 
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/students">     
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/faculties">  
            <ListItemIcon>
              <PeopleAltTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Faculty" />
          </ListItem>
          <Divider />
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/create/course">  
            <ListItemIcon>
              <QueueOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Course" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/create/student">  
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Student" />
          </ListItem>
        </div>

        :

        <div>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to="/home">        
            <ListItemIcon className={classes.sidebarIcon}>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to={`/courses`}> 
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem activeClassName={classes.avtive} button component={NavLink} to={`/faculty/${localStorage.getItem("id")}`}> 
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="MyPage" />
          </ListItem>
        </div>

    )
}

export default Nav
