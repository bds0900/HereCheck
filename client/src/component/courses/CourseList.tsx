import React, { ReactElement, Fragment } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { CourseType, CourseSubscriptionPayload } from '../Interfaces'
import { NavLink } from 'react-router-dom';
import {Typography ,List,ListItem, makeStyles} from '@material-ui/core';
import {GET_COURSES, GET_COURSES_BY_FACULTY_ID } from '../Query'
import {GET_COURSE_SUB}from '../Subscription'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';

interface CourseListData {
    courses: CourseType[];
}
  
interface CourseListVars {

}
interface AddCourse{
  course:CourseSubscriptionPayload
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

export default function CourseList(props: Props): ReactElement {
    const classes = useStyles()

    const role=localStorage.getItem('role')
    const id=localStorage.getItem('id')
    const QERUY=role=='USER'?GET_COURSES_BY_FACULTY_ID:GET_COURSES
    const{loading,data,refetch}= useQuery<CourseListData,CourseListVars>(QERUY,{variables:{id:localStorage.getItem('id')}});
    const sub=useSubscription<AddCourse>(GET_COURSE_SUB);
    if(!sub.loading) refetch()
    return (
        <div>
        {loading ? (
            <p>Loading ...</p>
          ) : (
            <Fragment>
              <Typography variant="h6" className={classes.title}>
                Course List
              </Typography>
              <div className={classes.demo}>
                <List className={classes.list}>
                  {data && data.courses.map(course => (
                    <ListItem key={course.id} className={classes.button} button component={NavLink} to={"/course/"+course.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <ClassIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={course.id}
                        secondary={course.name}
                      >
                      </ListItemText>
                    </ListItem>
                    ))
                  }
                </List>
              </div>

            </Fragment>
          )}
        </div>
    )
}
