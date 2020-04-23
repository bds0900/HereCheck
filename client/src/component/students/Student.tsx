import React, { ReactElement, Fragment, useState } from 'react'
import { StudentType,AttendanceSubscriptionPayload } from '../Interfaces'
import { useQuery,useSubscription } from '@apollo/react-hooks'
import {List,ListItem,Collapse,Typography, Button, makeStyles, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import UpdateStudent from './UpdateStudent'
import {  GET_STUDENT } from '../Query';
import {GET_ATTENDANCE_SUB} from '../Subscription'
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CourseStudentAttendance from '../courses/CourseStudentAttendance';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
interface CheckIn{
    attendance:AttendanceSubscriptionPayload
}

interface StudentData{
    student:StudentType;
}
interface StudentVars{
    student_id:string
}

interface Props {
    match:any
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    table: {
      width: '90%'
    },
    marginTop:{
        marginTop: 20,
    },
    container: {
        marginTop: 10,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    }

  }));

export default function Student(props: Props): ReactElement {
    const classes = useStyles();
    console.log(props.match.params.id)
    const{loading,data,refetch}=useQuery<StudentData,StudentVars>(
        GET_STUDENT,
        {variables:{student_id:props.match.params.id}}
    )
    const sub=useSubscription<CheckIn>(GET_ATTENDANCE_SUB);
    if(!sub.loading) refetch()
    const [open, setOpen] = useState(false);
    const [update,setUpdate]=useState(false);
    const role = localStorage.getItem('role')
    return (
        <div>
        {
        update 
            ? 
        (data && <UpdateStudent student={data.student}></UpdateStudent>) 
            : 
        (data &&
            <Fragment>
            <Grid container spacing={3} className={classes.container}>
            <Grid xs={6}>
            <Typography variant="h6" className={classes.title}>
            Student Info
            </Typography>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                  <TableRow>
                      <TableCell>
                        <Typography variant="h6">
                            Student ID :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                            {data && data.student.id}
                        </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                        <Typography variant="h6">
                            Name :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                            {data && data.student.FirstName} {data && data.student.LastName}
                        </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                        <Typography variant="h6">
                            Program :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                            {data && data.student.program && data.student.program.name}
                        </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                        <Typography variant="h6">
                            Email :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                            {data && data.student.email}
                        </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                        <Typography variant="h6">
                            Status :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                            {data && data.student.status}
                        </Typography>
                      </TableCell>
                  </TableRow>
                </Table>
                
            </TableContainer>
            </Grid>

            <Grid xs={6}>
            <Typography variant="h6" className={classes.title}>
            Enrolled Courses
            </Typography>
            <TableContainer component={Paper} className={classes.table}>
            
            <Table>
                <div className={classes.marginTop}>
                <List>
                

                {data && data.student.enrollments.map(enrollment=>(
                    <div>
                    <ListItem >
                    <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={enrollment.id}
                    >
                    <Typography variant="h5">
                            {enrollment.course.name}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <CourseStudentAttendance 
                        student_id={props.match.params.id} 
                        course_id={enrollment.course.id} 
                        classes={enrollment.course.classes}/>
                    </ExpansionPanelDetails>
                    
                    </ExpansionPanel>
                    </ListItem>
                    </div>
                ))}
                


                </List>
                </div>
            </Table>
            </TableContainer>
            </Grid>
            <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={()=>setUpdate(!update)}>Update</Button>
            </Grid>
            </Grid>
            
            </Fragment>
          )
        }
        </div>
    )
}
