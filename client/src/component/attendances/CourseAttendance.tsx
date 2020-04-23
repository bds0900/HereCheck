import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AttendanceType } from '../Interfaces'
import { GET_COURSE_ATTENDANCE } from '../Query'
import { List, ListItem } from '@material-ui/core'

interface Props {
    course_id:string
}
interface AttendanceData{
    attendances:AttendanceType[]
}
export default function CourseAttendance(props: Props): ReactElement {
    const {loading,data}=useQuery<AttendanceData,{}>(
        GET_COURSE_ATTENDANCE,
        {variables:{course_id:props.course_id}}
    )
    return (
        <div>
            {loading?
            <div>loading...</div>
            :
            <List>
            {data && data.attendances.map(attendance=>(
                <ListItem>{attendance.time}</ListItem>
            ))}
            </List>
            }
        </div>
    )
}
