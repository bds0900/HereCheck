import React, { ReactElement } from 'react'
import { AttendanceType } from '../Interfaces'

interface Props {
    attendance:AttendanceType
}

export default function Attendacne(props: Props): ReactElement {
    return (
        <div>
            <h5>{props.attendance.student.FirstName} {props.attendance.student.LastName}</h5>
            <h5>{props.attendance.time}</h5>
        </div>
    )
}
