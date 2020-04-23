import React, { ReactElement } from 'react'
import { ClassType, AttendanceType } from '../Interfaces'
import { useQuery } from '@apollo/react-hooks'
import { GET_CLASS, GET_CLASS_ATTENDANCE } from '../Query'
import ClassAttendance from '../attendances/ClassAttendance'


interface Props {
    class:ClassType
}

export default function Class(props: Props): ReactElement {
    
    return (
        <div>
            <h5>
            class room:{props.class.room}
            class start:{props.class.startTime}
            class end:{props.class.endTime}
            </h5>
            <ClassAttendance class_id={props.class.id}/>

        </div>
    )
}
