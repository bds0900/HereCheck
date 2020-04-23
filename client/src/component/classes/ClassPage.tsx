import React, { ReactElement, Fragment, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { ClassType, AttendanceType} from '../Interfaces';

import { GET_CLASS, GET_CLASS_ATTENDANCE } from '../Query'
import { GET_ATTENDANCE_SUB } from '../Subscription';
import {Typography ,Button, makeStyles, Box, Divider, Grid, Checkbox} from '@material-ui/core';
import CourseInfo from "../courses/CourseInfo"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';



interface Props {
    match:any
}

interface ClassVars{
    class_id:string
}

interface ClassData {
    class:ClassType
}

interface AddAttendace{
    attendance:AttendanceType
}

interface AttendanceListData{
    attendances:AttendanceType[]
}
interface AddAttendace{
    attendance:AttendanceType
}

export default function Course(props: Props): ReactElement {
    const classRes =useQuery<ClassData,{}>(
        GET_CLASS,
        {variables:{class_id:props.match.params.id}, notifyOnNetworkStatusChange: true}
    )
    
    const attendanceRes=useQuery<AttendanceListData>(
        GET_CLASS_ATTENDANCE,
        {variables:{class_id:props.match.params.id}}
    )
    
    // var attendanceList:AttendanceType[] = new Array()
    // if( attendanceRes && attendanceRes.data ){
    //     attendanceList = attendanceRes.data.attendances
    // }

    const sub=useSubscription<AddAttendace>(GET_ATTENDANCE_SUB);
    if( attendanceRes && attendanceRes.data && sub.data ) {
        attendanceRes.refetch()
        //attendanceRes.data.attendances.push(sub.data.attendance)
    }
    function isAttended(student_id: string, attendances:AttendanceType[]){
        let ret=false;
        for (const att of attendances){
            console.log(att)
            if(student_id === att.student.id){
                ret=true;
                break;
            }
        }
        return ret
    }
    let loading = classRes.loading && attendanceRes.loading

    return (
        <Fragment>
            {loading ?
            <div>Loading...</div>  :
            <Fragment>
                { classRes && classRes.data && (
                    <Fragment>
                        <CourseInfo course_id={classRes.data.class.course.id} />
                        <Typography variant="h6" gutterBottom>
                            Time: {classRes.data.class.startTime} - {classRes.data.class.endTime} 
                        </Typography>
                        <Typography variant="h6">
                            Room: {classRes.data.class.room}
                        </Typography>
                        <Divider/>
                        <Grid item xs={8}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableCell align="left" colSpan={3}>Class Attendance</TableCell>
                                    </TableHead>
                                    <TableHead>
                                        <TableCell>Student ID</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Attendance</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        {classRes && classRes.data && classRes.data.class.course.enrollments.map((e)=>(
                                            <TableRow key={e.student.id} >
                                                <TableCell align="left">{e.student.id}</TableCell>
                                                <TableCell align="center">{e.student.FirstName} {e.student.LastName}</TableCell>
                                                <TableCell align="center" >
                                                    {attendanceRes && attendanceRes.data && isAttended(e.student.id, attendanceRes.data.attendances)?<CheckIcon/>:<RemoveIcon/>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                </Table>
                            </TableContainer>
                            
                            
                        </Grid>
                        
                    </Fragment>
                ) }
            </Fragment>
        }
            
        </Fragment>
    )
}