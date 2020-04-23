import React ,{Component,Fragment, useState, PropsWithChildren, ReactElement}from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavLink, withRouter, Route } from "react-router-dom";
import {AppBar, Tabs, Tab, Box,Typography,makeStyles,Breadcrumbs,Chip, Button, Icon  } from '@material-ui/core'
import { emphasize, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import {LockOpen,Person,Loyalty,Subject} from '@material-ui/icons'
import PropTypes from 'prop-types';
import { Routes } from "./Routes";
import client from './Client'
import Login from './component/signup/Login'
import ProgramList from './component/programs/ProgramList'
import './App.css';
import CourseList from './component/courses/CourseList';
import FacultyList from './component/faculties/FacultyList';
import StudentList from './component/students/StudentList';
import { Role, FacultyType } from './component/Interfaces';
import Nav from './component/Nav';

import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface AppProps {
  history: any;
}




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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


function App(props:AppProps): ReactElement<AppProps> {
  const classes = useStyles();
  const [isAuthenticated,setIsAuth]=useState(localStorage.getItem("role")?true:false)
  const [isAuthenticating,setIsAuth2]=useState(false)
  const [value,setValue]=useState(0)

  // for material ui
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  // async componentDidMount() {
    // try {
    //   if (await Auth.currentSession()) {
    //     this.userHasAuthenticated(true);
    //   }
    // }
    // catch(e) {
    //   if (e !== 'No current user') {
    //     alert(e);
    //   }
    // }
  
  //   setIsAuth2(false);
  // }
  const userHasAuthenticated = (authenticated: boolean) => {
    setIsAuth(authenticated);
  }

  const handleLogout = async () => {
    // await Auth.signOut();
  
    userHasAuthenticated(false);
    localStorage.clear()
    //props.history.push("/login");
  }

  const handleChange = (event:React.ChangeEvent<{}>, newValue:number) => {
    setValue(newValue);
  };


  const showLoggedInBar = () => {
    
    
  };


  const showLoggedOutBar = () => (
    <Fragment>
    <Breadcrumbs aria-label="breadcrumb">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
    </Breadcrumbs>

      
    </Fragment>
  );

  


  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: userHasAuthenticated
  };


    
  return (
    <div>
    <ApolloProvider client={client}>
      {isAuthenticated ? 
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              {/*<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Pi-Project
              </Typography>*/}
              {localStorage.getItem("role")!="USER"?
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                 Admin Page
              </Typography>:
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                 Faculty Page
              </Typography>
              }
              
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.paper}>
                 Welcome!
              </Typography>
              <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
                 {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}
              </Typography>
              <Button color="inherit" component={NavLink} to="/" onClick={handleLogout}>
                    Log Out
                    <Icon className={classes.toolbarIcon}>
                      <ExitToAppIcon/>
                    </Icon>
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <Nav history={props.history} isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated}/>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Routes isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated} />
            </Container>
          </main>
        </div>
        :
        <Login isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated}/>
      }
{/* 
    <div>
      {isAuthenticated ? 
        <Nav history={props.history} isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated}/> : 
        <Login isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated}/>}
      <Routes isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated} />
    </div> */}
    </ApolloProvider>
    </div>
  );
  
  
}

export default App;
