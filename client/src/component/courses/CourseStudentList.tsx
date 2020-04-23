import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_STUDENTS_BY_COURSE } from '../Query'
import { StudentType, ClassType } from '../Interfaces'
import { List, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core'
import CourseStudentAttendance from './CourseStudentAttendance'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
    course_id:string
    classes:ClassType[]
}
interface StudentListData{
    students:StudentType[]
}

export default function CourseStudentList(props: Props): ReactElement {
    const course_id=props.course_id
    const classes=props.classes
    const {loading,data}=useQuery<StudentListData,{}>(
        GET_STUDENTS_BY_COURSE,
        {variables:{course_id:course_id}}
    )
    return (
        <div>
            {loading?
            <div>loading student list...</div>:
            
            <List>
            {data && data.students && data.students.map(student=>(
                student &&
                <div>
                <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={student.id}
                >
                    <Typography >{student.FirstName} {student.LastName}</Typography>
                    
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <CourseStudentAttendance course_id={course_id} student_id={student.id} classes={classes}/>
                </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>
            ))}
            </List>
            }
        </div>
    )
}
