import React, { ReactElement, useState } from 'react'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import {  CourseType } from '../Interfaces'

interface Props {
    courses:CourseType[]|undefined
    onCourseClick:any
}

export default function SelectCourse(props: Props): ReactElement {

    const courses=props.courses;
    const [course,setCourse]=useState<string>();
    
    return (
        <div>
        <InputLabel >Course</InputLabel>
        <Select value={course} onChange={e=>{
            setCourse(e.target.value as string)
            props.onCourseClick(e.target.value as string)
        }}>
        {
            courses?.map(course=>(
                <MenuItem  key={course.id} value={course.id}>
                    {course.name}
                </MenuItem >
            ))
        }
        </Select>
        </div>
    )
}
