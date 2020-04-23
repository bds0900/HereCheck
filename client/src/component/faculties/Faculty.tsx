import React, { ReactElement, Fragment, useState } from 'react'
import { StudentType,AttendanceSubscriptionPayload, FacultyType } from '../Interfaces'
import { useQuery,useSubscription } from '@apollo/react-hooks'
import  gql  from 'graphql-tag';

import {List,ListItem,Collapse,Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import UpdateFaculty from './UpdateFaculty'

import { GET_FACULTY } from '../Query';
import {GET_ATTENDANCE_SUB}from '../Subscription'
import Class from '../classes/Class';

interface CheckIn{
    attendance:AttendanceSubscriptionPayload
}

interface FacultyData{
    faculty:FacultyType;
}
interface FacultyVars{
    faculty_id:string
}

interface Props {
    match:any
}

export default function Faculty(props: Props): ReactElement {
    console.log(props.match.params.id)
    const{loading,data,refetch}=useQuery<FacultyData,FacultyVars>(
        GET_FACULTY,
        {variables:{faculty_id:props.match.params.id}}
    )
    const sub=useSubscription<CheckIn>(GET_ATTENDANCE_SUB);
    if(!sub.loading) refetch()
    const [open, setOpen] = useState(false);
    const [update,setUpdate]=useState(false);

    return (
        <div>
        {loading
            ?
        <div>loading...</div>
            :
        update 
            ? 
        (data && <UpdateFaculty faculty={data.faculty}/>) 
            : 
        (
            data &&
            <Fragment>
            <Typography component="h1" variant="h6" color="inherit" noWrap >
                 My Information
             </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                    <TableCell style={{width: 20}}><Typography variant="body2" gutterBottom>ID</Typography></TableCell>
                    <TableCell style={{fontWeight: "bold"}}>{data && data.faculty && data.faculty.id}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell style={{fontWeight: "bold"}}>{data && data.faculty && data.faculty.FirstName} {data && data.faculty && data.faculty.LastName}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Eamil</TableCell>
                    <TableCell style={{fontWeight: "bold"}}>{data && data.faculty && data.faculty.email}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell style={{fontWeight: "bold"}}>{data && data.faculty && data.faculty.status}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Program</TableCell>
                    <TableCell style={{fontWeight: "bold"}}>{data && data.faculty.program && data.faculty.program.name}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Button onClick={()=>setUpdate(!update)}>Update</Button>
            </Fragment>
          )
        }
        </div>
    )
}
