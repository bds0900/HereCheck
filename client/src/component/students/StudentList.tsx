import React, { ReactElement, Fragment } from 'react'
import { useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';
import { StudentType } from '../Interfaces';
import { GET_STUDENTS } from '../Query';
import { List, Typography, ListItem, ListItemText, Avatar, ListItemAvatar, makeStyles } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
interface StudentListData {
    students: StudentType[];
}
  
interface StudentListVars {
    student_id:string;
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
export default function StudentList(props: Props): ReactElement {
    const classes = useStyles()
    const{loading,data}= useQuery<StudentListData,StudentListVars>(
        GET_STUDENTS
    );
    return (
        <div>
            
            {loading ? (
                <p>Loading ...</p>
              ) : (
                <Fragment>
                <Typography variant="h6" className={classes.title}>
                Student list
                </Typography>
                <div className={classes.demo}>
                <List className={classes.list}>
                {data && data.students.map(student => (
                    <ListItem key={student.id} className={classes.button} button component={NavLink} to={"/student/"+student.id}> 
                     
                    <ListItemAvatar>
                        <Avatar>
                          <PermIdentityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={student.FirstName}
                        secondary={student.LastName}
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
