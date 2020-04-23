import React, { ReactElement, useState } from 'react'
import { TextField, Button, InputLabel, Select, MenuItem, Typography } from '@material-ui/core'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ProgramType, StudentType, EnrollmentType, FacultyType } from '../Interfaces';
import { GET_PROGRAMS, GET_PROGRAMS_BY_FAULTY_ID} from '../Query';
import {UPDATE_FACULTY,CREATE_ENROLLMENT}from '../Mutation'
import SelectProgram from '../common/SelectProgram';
import SelectCourses from '../common/SelectCourses';
import CreateEnrollment from '../enrollment/CreateEnrollment';
import CreateInstructing from '../instructing/CreateInstructing';

interface Props {
    faculty:FacultyType
}
interface ProgramListData {
    programs: ProgramType[];
}
  
interface ProgramListVars {

}
interface FacultyData {
    updateFaculty: FacultyType;
}
  
interface FacultyVars {

}

interface EnrollmentData {
    enrollment:EnrollmentType;
}
  
interface EnrollmentVars {

}

export default function Signup(props: Props): ReactElement {
    const faculty=props.faculty
    const [FirstName, setFirstName] = useState(faculty.FirstName)
    const [lastName, setLastName] = useState(faculty.LastName)
    const [program, setProgram] = useState<string|undefined>(faculty.program?faculty.program.id:undefined)
    const [password, setPassword] = useState(faculty.password)
    const [id, setID] = useState(faculty.id)
    const [email, setEmail] = useState(faculty.email)
    const [addCourse,setCourse]=useState(false)

    const role=localStorage.getItem('role')
    const QERUY=role=='USER'?GET_PROGRAMS_BY_FAULTY_ID:GET_PROGRAMS
    const result = useQuery<ProgramListData,ProgramListVars>(QERUY,{variables:{id:id}});

    const [saveFaculty, { error, data }]=  
    useMutation<FacultyData,FacultyVars>(
        UPDATE_FACULTY,
        {variables:{
            id:id,
            FirstName:FirstName,
            lastName:lastName,
            password:password,
            program_id:program
        }}
    )
    function onProgramClick(program_id:string):any{
        setProgram(program_id)
    }
    console.log(data)

    return (
        <div>
        <h3>Update User</h3>
            {addCourse?<CreateInstructing faculty_id={id}></CreateInstructing>:
            <div>
                {error ? <p>Oh no! {error.message}</p> : null}
                {data && data.updateFaculty 
                    ? 
                <div>
                <p>Saved!</p> 
                <Typography variant="h5" gutterBottom>
                    Student ID: {data && data.updateFaculty.id}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Student name: {data && data.updateFaculty.FirstName} {data.updateFaculty.LastName}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Student Email: {data && data.updateFaculty.email}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Status: {data && data.updateFaculty.status}
                </Typography>
                </div>
                    : 
                <div>
                {localStorage.getItem('role')==="USER"?null:
                <Button color="primary" variant="text" onClick={() => 
                    setCourse(true) }>
                    Add courese
                </Button>
                }
                <br/>
                    <TextField
                    disabled
                    placeholder="Enter your ID"
                    label="ID"
                    value={id}
                    />
                    <br/>
                    <TextField
                    placeholder="Enter your first name"
                    label="First Name"
                    value={FirstName}
                    onChange={e=>{
                        setFirstName(e.target.value)

                        }}
                    />
                    <br/>
                    <TextField
                    placeholder="Enter your last name"
                    label="Last Name"
                    value={lastName}
                    onChange={e=>{
                        setLastName(e.target.value)

                    }}
                    />
                    <br/>
                    <TextField
                    placeholder="At least 8 digits"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={e=>{
                        setPassword(e.target.value)

                    }}
                    />
                    <br/>
                    <TextField
                    disabled
                    placeholder="Enter your email"
                    label="Email"
                    value={email}
                    />
                    <br/>
                    Current program is {faculty.program ? faculty.program.name : "none"}
                    {result && result.data && 
                     <SelectProgram programs={result.data.programs} onProgramClick={onProgramClick}/>
                    }
                        

                    <br/>
                    
                    <Button color="primary" variant="text" onClick={() => 
                        id && FirstName && lastName && password && program && saveFaculty() }>
                        Update User
                    </Button>
                </div>
                
                }
            </div>
            }
        </div>
    )
}


