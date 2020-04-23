import React, { ReactElement, Fragment, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { CourseType, Role, ClassSubscriptionPayload, AttendanceType } from '../Interfaces';
import { NavLink } from 'react-router-dom';
import {Typography ,Button, makeStyles, Box} from '@material-ui/core';
import {GET_COURSE } from '../Query'
import {GET_CLASS_SUB, GET_ATTENDANCE_SUB}from '../Subscription'
import UpdateCourse from './UpdateCourse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import CourseStudentList from './CourseStudentList';
import CreateClass from '../classes/CreateClass';

interface CourseData{
    course:CourseType
}
interface CourseVars{
    coure_id:string
}
interface Props {
    match:any
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
        { variables: { coure_id: props.match.params.id },notifyOnNetworkStatusChange: true }
        
    );


    
    const showSuperAdminCourse = () => (
      <Fragment>
      <Grid container spacing={3} className={classes.container}>
      <Grid item xs={6}>
        <Typography variant="h6">
          Student List
        </Typography>
        {showStudnetTable()}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">
          Class List
        </Typography>
        {showClassTable()}
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" onClick={()=>setUpdate(!update)}>update</Button>
      </Grid>
    </Grid>
    </Fragment>
    ); 
    const showAdminCourse = () => (
      <Fragment>
      <Grid container spacing={3} className={classes.container}>
      <Grid item xs={6}>
        <Typography variant="h6">
          Student List
        </Typography>
        {showStudnetTable()}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">
          Class List
        </Typography>
        {showClassTable()}
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" onClick={()=>setUpdate(!update)}>update</Button>
      </Grid>
    </Grid>
    </Fragment>
    ); 
    const showUserCourse = () => (
      <Fragment>
      <Grid container spacing={3} className={classes.container}>
      <Grid item xs={6}>
        <Typography variant="h6">
         Enrolled Students
        </Typography>
        {data && data.course && <CourseStudentList course_id={data.course.id} classes={data.course.classes}/> }
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" p={1}>
          <Box flexGrow={1}>
            <Typography variant="h6">
              Classes     
            </Typography>
          </Box>
          <Box>
            <Button color="primary" size="small" variant="contained" style={{display:addClass?"none":"inline"}} onClick={() => 
              setAddClass(true) }>
              + Add Class
            </Button>  
          </Box>
        </Box>
        
      {addClass?<div>{data && data.course && <CreateClass course_id={data.course.id}></CreateClass> }</div>:
      showClassTable()
      }
        
      </Grid>

    </Grid>
    </Fragment>
    ); 
    const showClassTable = () =>(
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Room</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.course.classes && data.course.classes.map((clas)=>(
            <TableRow key={clas.id}>
              <TableCell align="center">
                <NavLink to={"/classpage/"+clas.id}>{clas.room}</NavLink>
              </TableCell>
              <TableCell align="center">
                <NavLink to={"/classpage/"+clas.id}>{clas.startTime}</NavLink>
              </TableCell>
              <TableCell align="center">
                <NavLink to={"/classpage/"+clas.id}>{clas.endTime}</NavLink>
              </TableCell>
            </TableRow>
        ))} 
        </TableBody>
      </Table>
      </TableContainer>
    )
    const showStudnetTable=()=>(
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>ID</TableCell>
        </TableHead>
        <TableBody>
          {data && data.course.enrollments && data.course.enrollments.map(enrollment=>(
            enrollment && enrollment.student &&
            <TableRow>
              <TableCell key={enrollment.student.id}>
                <NavLink to={"/student/"+enrollment.student.id}>
                  {enrollment.student.FirstName} {enrollment.student.LastName}
                </NavLink>
              </TableCell>
              <TableCell key={enrollment.student.id}>
                <NavLink to={"/student/"+enrollment.student.id}>
                  {enrollment.student.id}
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
    
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
          {/*<Typography variant="h6" gutterBottom>
            {data && data.course.program.name}
        </Typography>*/}
          <Divider/>
          {role==Role.SUPERADMIN?
            showSuperAdminCourse()
            :
            role==Role.ADMIN?  
            showAdminCourse()
            :
            showUserCourse()
          }
          
          </Fragment>

        )}
        
        </Fragment>
      }
      </Fragment>
    )
}
