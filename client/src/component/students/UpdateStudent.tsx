import React, { ReactElement, useState } from 'react'
import { TextField, Button, InputLabel, Select, MenuItem, Typography } from '@material-ui/core'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ProgramType, StudentType, EnrollmentType } from '../Interfaces';
import { GET_PROGRAMS} from '../Query';
import {UPDATE_STUDENT,CREATE_ENROLLMENT}from '../Mutation'
import SelectProgram from '../common/SelectProgram';
import SelectCourses from '../common/SelectCourses';
import CreateEnrollment from '../enrollment/CreateEnrollment';

interface Props {
    student:StudentType
}
interface ProgramListData {
    programs: ProgramType[];
}
  
interface ProgramListVars {

}
interface StudentData {
    updateStudent: StudentType;
}
  
interface StudentVars {

}

interface EnrollmentData {
    enrollment:EnrollmentType;
}
  
interface EnrollmentVars {

}

export default function Signup(props: Props): ReactElement {
    const student=props.student
    const [FirstName, setFirstName] = useState(student.FirstName)
    const [lastName, setLastName] = useState(student.LastName)
    const [program, setProgram] = useState(student.program.id)
    const [password, setPassword] = useState(student.password)
    const [id, setID] = useState(student.id)
    const [email, setEmail] = useState(student.email)
    const [addCourse,setCourse]=useState(false)

    const result = useQuery<ProgramListData,ProgramListVars>(GET_PROGRAMS);

    const [saveStudent, { error, data }]=  
    useMutation<StudentData,StudentVars>(
        UPDATE_STUDENT,
        {variables:{
            id:id,
            FirstName:FirstName,
            lastName:lastName,
            password:password,
            program_id:program
        }}
    )


    return (
        <div>
        <h3>Update User</h3>
            {addCourse?<CreateEnrollment student_id={id}></CreateEnrollment>:
            <div>
                {error ? <p>Oh no! {error.message}</p> : null}
                {data && data.updateStudent 
                    ? 
                <div>
                <p>Saved!</p> 
                <Typography variant="h5" gutterBottom>
                    Student ID: {data && data.updateStudent.id}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Student name: {data && data.updateStudent.FirstName} {data.updateStudent.LastName}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Student Email: {data && data.updateStudent.email}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Status: {data && data.updateStudent.status}
                </Typography>
                </div>
                    : 
                <div>
                
                <Button color="primary" variant="text" onClick={() => 
                    setCourse(true) }>
                    Add courese
                </Button>
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
                    
                    <Button color="primary" variant="text" onClick={() => 
                        id && FirstName && lastName && password && program && saveStudent() }>
                        Update User
                    </Button>
                </div>
                
                }
            </div>
            }
        </div>
    )
}


