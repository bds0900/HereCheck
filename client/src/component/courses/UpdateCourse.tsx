import React, { ReactElement, Fragment,useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery, useMutation} from '@apollo/react-hooks';
import {ExpansionPanel ,ExpansionPanelSummary ,ExpansionPanelDetails ,Typography ,List,ListItem, TextField, Button, InputLabel, MenuItem, Select} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink, withRouter, Route } from "react-router-dom";
import {ProgramType, CourseType} from '../Interfaces'
import {GET_PROGRAMS}from '../Query'
import {UPDATE_COURSE} from '../Mutation'
import Course from '../courses/Course';
import CreateClass from '../classes/CreateClass';


interface CourseData {
    updateCourse: CourseType;
}
  
interface CourseVars {
    id: string;
    name:string;
    numOfStudent:number
    program:string
}
interface ProgramData {
    programs: ProgramType[];
}
  
interface ProgramVars {

}
interface Props {
    course:CourseType;
}


//this component get program type as props and display program infomation
export default function UpdateCourse(props: Props): ReactElement {

  const course=props.course
  const [name, setName] = useState(course.name)
  const [id, setID] = useState(course.id)
  const [program,setProgram]=useState(course.program.name)
  const [NOS, setNOS] = useState(course.numOfStudent)
  const [addClass, setClass] = useState(false)
  

  const result=useQuery<ProgramData,ProgramVars>(GET_PROGRAMS)
  const [saveCourse, { error, data }]=  useMutation<CourseData,CourseVars>(
    UPDATE_COURSE,
    {variables:{id:id,name:name,numOfStudent:NOS, program:program}}
  )

  return (
    <div>
    <h3>Update a Course</h3>
    {addClass?<CreateClass course_id={id}/>:
    <div>
    {error ? <p>Oh no! {error.message}</p> : null}
    {data && data.updateCourse 
        ? 
    <p>Saved!</p> 
        : 


    
    <div className="UpdateCourse">
    <Button color="primary" variant="text" onClick={() => 
        setClass(true) }>
        Add Class
    </Button>
    <br/>
    <TextField
    placeholder="Enter the Course name"
    label="Course Name"
    value={name}
    onChange={e=>setName(e.target.value)}
    />
    <br/>
    <TextField disabled
    placeholder="Enter Course ID"
    label="Course ID"
    value={id}
    onChange={e=>setID(e.target.value)}
    />
    <br/>
    <TextField 
    placeholder="Enter Number of Student"
    label="Number of Student"
    value={NOS}
    onChange={e=>setNOS(Number(e.target.value))}
    />
    <br/>
    Current program is {props.course.program.name}

    <InputLabel >Program</InputLabel>
        <Select value={program} onChange={(e)=>setProgram(e.target.value as string)}>
        {result.loading?(
                <MenuItem  disabled>loading....</MenuItem >
        ):(
            result.data?.programs.map(program=>(
                <MenuItem  key={program.id} value={program.id}>
                    {program.name}
                </MenuItem >
            ))
        )}
        </Select>


    <br/>
    <Button color="primary" variant="text" onClick={() => id && name && NOS && program && saveCourse()}>
        Update Course
    </Button>
    </div>

    }
    </div>}
    </div>
  )
}

