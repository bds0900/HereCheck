import React, { ReactElement, Fragment, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { CourseType } from '../Interfaces';
import { NavLink } from 'react-router-dom';
import {Typography ,Button, makeStyles, Box} from '@material-ui/core';
import {GET_COURSE } from '../Query'
import UpdateCourse from './UpdateCourse';
import Divider from '@material-ui/core/Divider';


interface CourseData{
    course:CourseType
}
interface CourseVars{
    coure_id:string
}
interface Props {
    course_id:string
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  container: {
    marginTop: 10,
  }
}));


export default function Course(props: Props): ReactElement {
    const classes = useStyles()
    const role=localStorage.getItem("role");
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [addClass, setAddClass] = useState(false);
    const { loading, data, refetch,networkStatus  } = useQuery<CourseData, CourseVars>(
        GET_COURSE,
        { variables: { coure_id: props.course_id },notifyOnNetworkStatusChange: true }
        
    );
    return (
      <Fragment>
        {loading?
        <div>loading course page...</div>:
        <Fragment>
        {update ? (
          data && <UpdateCourse course={data.course}></UpdateCourse>
        ) : (
          <Fragment>
          <Typography variant="h5" gutterBottom>
            {/*data && data.course.id*/}Course name : {data && data.course.name} 
          </Typography>
          </Fragment>

        )}
        
        </Fragment>
      }
      </Fragment>
    )
}
