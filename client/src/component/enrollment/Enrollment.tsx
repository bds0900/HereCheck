import React, { ReactElement } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_ENROLLMENT } from '../Mutation'
import { EnrollmentType } from '../Interfaces'


interface EnrollmentData{
    enrollment:EnrollmentType
}
interface EnrollmentVars{

}
interface Props {
    student_id:string;
    course_id:string
}

export default function Enrollment(props: Props): ReactElement {
    const [saveEnrollment, { error, data }]=useMutation<EnrollmentData,EnrollmentVars>(
        CREATE_ENROLLMENT,
        {
            variables:{student_id:props.student_id,course_id:props.course_id}
        }
    )
    return (
        <div>
        {error ? <p>Oh no! {error.message}</p> : null}
        {data && data.enrollment ? <p>Saved!</p> : null}
        {saveEnrollment()}
        </div>
    )
}


