import React, { ReactElement } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { GET_STUDENT_COURSE_ATTENDANCE,  } from '../Query'
import { AttendanceType, ClassType } from '../Interfaces'
import { TableHead, Table, TableCell, TableRow, TableBody } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { GET_ATTENDANCE_SUB } from '../Subscription';
interface Props {
    course_id:string,
    student_id:string
    classes:ClassType[]
}
interface AttendanceListData{
  attendances:AttendanceType[]
}
interface AddAttendace{
  attendance:AttendanceType
}
export default function CourseStudentAttendance(props: Props): ReactElement {
    const classes=props.classes;
    const {loading,data,refetch}=useQuery<AttendanceListData>(
        GET_STUDENT_COURSE_ATTENDANCE,
        {variables:{student_id:props.student_id,course_id:props.course_id}}
    )
    const sub=useSubscription<AddAttendace>(GET_ATTENDANCE_SUB);
    if(!sub.loading) refetch()
    
    function check(class_id:string,attendances:AttendanceType[]){
        let ret=false;
        for (const att of attendances){
            if(att.class.id==class_id){
                ret=true;
                break;
            }
        }
        return ret
    }


    return (
        <div>
            {loading?
            <div>loading attendance...</div>
            :
            <div>
            <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Room</TableCell>
                      <TableCell align="center">Start Time</TableCell>
                      <TableCell align="center">End Time</TableCell>
                      <TableCell align="center">Check</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && classes.map(clas=>(
                      <TableRow key={clas.id} style={{background: check(clas.id, data.attendances)?"#50C878":"pink"}}>
                        <TableCell align="center">{clas.room}</TableCell>
                        <TableCell align="center">{clas.startTime}</TableCell>
                        <TableCell align="center">{clas.endTime}</TableCell>
                        <TableCell align="center">
                        {data && check(clas.id, data.attendances)?<CheckIcon/>:<CloseIcon/>}
                        </TableCell>
                      </TableRow>
                    ))}
                    

                  </TableBody>
                </Table>
            </div>
            }
        </div>
    )
}
