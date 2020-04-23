import React, { ReactElement, useState } from 'react'
import {TextField,Button,FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import gql from 'graphql-tag';
import { useMutation, useQuery  } from '@apollo/react-hooks';

import {CourseType,ProgramType} from '../Interfaces'
import {GET_PROGRAMS} from '../Query'
import {CREATE_COURSE} from '../Mutation'
import SelectProgram from '../common/SelectProgram';


const nameRegex= /(?!^.*[A-Z]{2,}.*$)^[A-Za-z0-9 ]*$/;


interface Props {
    
}


interface ProgramListData {
    programs: ProgramType[];
}
  
interface ProgramListVars {

}

interface CourseData{
    createCourse:CourseType
}
interface CourseVars {
    id: string;
    name:string;
    NOS:number;
    program_id:string
}

export default function CreateProgram({}: Props): ReactElement {

    const [name, setName] = useState("")
    const [id, setID] = useState("")
    const [numOfStudent, setNOS] = useState("")
    const [program, setProgram] = useState("")
    const [courseNameValid, setCourseNameValid] = useState<"success" | "error" | "warning" | undefined>()
    const [courseIDValid, setCourseIDValid] = useState<"success" | "error" | "warning" | undefined>()
    const [numOfStudentValid, setNumOfStudentValid] = useState<"success" | "error" | "warning" | undefined>()

    
    function onProgramClick(program_id:string):any{
        setProgram(program_id)
    }
    const [saveCourse, { error, data }]=  useMutation<CourseData,CourseVars>(
        CREATE_COURSE,
        {variables:{id:id,name:name,NOS:Number(numOfStudent),program_id:program}}
    )

    const result = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);
    
    return (
        <div>
        <h3>Add a Course</h3>
        {error ? <p>Course is already added {error.message}</p> : null}
        {data && data.createCourse 
            ? 
        <p>Saved!</p> 
            : 
        <form>
        <div className="CreateCourse">
        <TextField
        placeholder="Enter the course name"
        label="Course Name"
        value={name}
        onChange={e=>{
            setName(e.target.value)
            setCourseNameValid(nameRegex.test(e.target.value.toLowerCase()) ? 'success' : 'error')
        }}
        />
        <br/>
        <TextField
        placeholder="Enter course ID"
        label="Course ID"
        value={id}
        onChange={e=>{
            setID(e.target.value)
            setCourseIDValid(nameRegex.test(e.target.value.toLowerCase()) ? 'success' : 'error')
        }}
        />
        <br/>
        <TextField
        placeholder="Enter number of student"
        label="Number of student"
        value={numOfStudent}
        onChange={e=>{
            setNOS(e.target.value)
            setNumOfStudentValid(Number(e.target.value)>0?'success':'error')
        }}
        />
        <br/>
       
        <SelectProgram programs={result.data?.programs} onProgramClick={onProgramClick}/>
 
        <br/>
        <Button color="primary" variant="text" 
        disabled={courseNameValid !== 'success' || courseIDValid !== 'success' || numOfStudentValid !== 'success' }
        onClick={() => id && name && numOfStudent && program && saveCourse()}>
            Add
        </Button>
        </div>
        </form>
        
        }

        </div>
    )
}

