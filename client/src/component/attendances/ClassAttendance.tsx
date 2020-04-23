import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AttendanceType } from '../Interfaces'
import {  GET_CLASS_ATTENDANCE } from '../Query'
import { List, ListItem } from '@material-ui/core'

interface Props {
    class_id:string
}
interface AttendanceData{
    attendances:AttendanceType[]
}
export default function ClassAttendance(props: Props): ReactElement {
    const {loading,data}=useQuery<AttendanceData,{}>(
        GET_CLASS_ATTENDANCE,
        {variables:{class_id:props.class_id}}
    )
    return (
        <div>
            {loading?
            <div>loading...</div>
            :
            <List>{data && data.attendances.map(attendance=>(
                <ListItem>{attendance.student.FirstName} {attendance.time} </ListItem>
            ))}
            </List>
            }
        </div>
    )
}
