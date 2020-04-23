import React, { ReactElement, Fragment } from 'react'
import { useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';
import { StudentType, FacultyType } from '../Interfaces';
import { GET_FACULTIES } from '../Query';
import { List, Typography, ListItem, ListItemText, ListItemAvatar, Avatar, makeStyles } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
interface FacultyListData {
    faculties: FacultyType[];
}
  
interface FacultyListVars {
    faculty_id:string;
}

interface Props {
    
}
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    button: {
      '&:hover': {
        background: '#dadada',
      }
    },
    list: {
      width: "50%",
    }
  }));
export default function FacultyList(props: Props): ReactElement {
    const classes = useStyles()
    const{loading,data}= useQuery<FacultyListData,FacultyListVars>(
        GET_FACULTIES
    );
    return (
        <div>
            
            {loading ? (
                <p>Loading ...</p>
              ) : (
                <Fragment>
                <Typography variant="h6" className={classes.title}>
                Faculty list
                </Typography>
                <div className={classes.demo}>
                <List className={classes.list}>
                {data && data.faculties.map(faculty => (
                    <ListItem key={faculty.id} className={classes.button} button component={NavLink} to={"/faculty/"+faculty.id}> 
                    <ListItemAvatar>
                    <Avatar>
                      <PermIdentityIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={faculty.FirstName}
                        secondary={faculty.LastName}
                    >
                    </ListItemText>
                    </ListItem>
                ))}
                </List>
                </div>
                </Fragment>
              )}
        </div>
    )
}
