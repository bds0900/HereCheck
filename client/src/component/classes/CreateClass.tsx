import React, { ReactElement, useState } from 'react'
import {TextField,Button,FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import gql from 'graphql-tag';
import { useMutation, useQuery  } from '@apollo/react-hooks';

import {CourseType,ProgramType, EnrollmentType, InstructingType,ClassType} from '../Interfaces'
import {GET_PROGRAMS} from '../Query'
import {CREATE_COURSE,CREATE_INSTRUCTING,CREATE_CLASS} from '../Mutation'
import SelectProgram from '../common/SelectProgram';
import SelectCourses from '../common/SelectCourses';
interface Props {
    course_id:string
}
interface ClassData{
    createClass:ClassType
}
interface ClassVars{

}

export default function CreateClass(props: Props): ReactElement {


    const [id, setID] = useState(props.course_id)
    const [room, setRoom] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")

    const [saveClass, { error, data }]=useMutation<ClassData,ClassVars>(
        CREATE_CLASS,
        {
            variables:{
                course_id:props.course_id,
                room:room,
                start:start,
                end:end
            }
        }
    )
        console.log(data)
    return (
        <div>
        <h3>Add a Class</h3>
        {error ? <p>Oh no! {error.message}</p> :
        <div> 
            {data 
                ? 
            <div>
            Saved!
            <Table>
            <TableHead>
            <TableRow>
                <TableCell align="center">Room</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={data.createClass.id}>
                <TableCell align="center">{data.createClass.room}</TableCell>
                <TableCell align="center">{data.createClass.startTime}</TableCell>
                <TableCell align="center">{data.createClass.endTime}</TableCell>
                </TableRow>
            </TableBody>
            </Table>
            </div> 
                : 
            <div className="CreateClass">
                <TextField
                placeholder="Enter the Room name"
                label="Room Name"
                value={room}
                onChange={e=>setRoom(e.target.value)}
                />
                <br/>
                <TextField
                placeholder="Enter the start time"
                label="Start Time"
                value={start}
                onChange={e=>setStart(e.target.value)}
                />
                <br/>
                <TextField
                placeholder="Enter the end time"
                label="End Time"
                value={end}
                onChange={e=>setEnd(e.target.value)}
                />
                <br/>


                <Button color="primary" variant="text" onClick={() => 
                    room && start && end && saveClass() }>
                    Add Class
                </Button>
            </div>
            }
        </div>
        }
        </div>
    )
}
