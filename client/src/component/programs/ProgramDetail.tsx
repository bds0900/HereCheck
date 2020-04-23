import React, { ReactElement, Fragment,useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery} from '@apollo/react-hooks';
import {ExpansionPanel ,ExpansionPanelSummary ,ExpansionPanelDetails ,Typography ,List,ListItem, Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink, withRouter, Route } from "react-router-dom";
import {ProgramType} from '../Interfaces'
import {GET_PROGRAM} from '../Query'
import './programList.css'
import Course from '../courses/Course';
import UpdateProgram from './UpdateProgram';


interface ProgramData {
    program: ProgramType;
}
  
interface ProgramVars {
    id: string;
}
interface Props {
    match:any
}


//this component get program type as props and display program infomation
export default function Program(props: Props): ReactElement {
  

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const { loading, data } = useQuery<ProgramData, ProgramVars>(
    GET_PROGRAM,
    { variables: { id: props.match.params.id } }
  );
  const handleClick = () => {
    setOpen(!open);
  };



  return (
    <div>
    {update?
      <div>
      {data&&<UpdateProgram program={data.program}/>}
      </div>:
    
    
      <div>
    <Typography variant="h5" gutterBottom>
    Program ID: {data && data?.program.id}
    </Typography>
    <Typography variant="h5" gutterBottom>
    Program name: {data && data?.program.name}
    </Typography>

    <Button onClick={()=>setUpdate(!update)}>update</Button>

    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography >{data?.program.name} Course List</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <List>
        {data?.program.courses?.map(course=>(
          <ListItem key={course.id}>
            <NavLink to={"/course/"+course.id}>
            <Typography>{course.name}</Typography>
            </NavLink> 
          </ListItem>
        ))}
      </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography >{data?.program.name} Faculty List</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <List>
        {data?.program.faculties?.map(faculty=>(
          <ListItem key={faculty.id}>
            <NavLink to={"/faculty/"+faculty.id}>
            <Typography>{faculty.FirstName} {faculty.LastName}</Typography>
            </NavLink> 
          </ListItem>
        ))}
      </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography >{data?.program.name} Student List</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <List>
        {data?.program.students?.map(student=>(
          <ListItem key={student.id}>
            <NavLink to={"/student/"+student.id}>
            <Typography>{student.FirstName} {student.LastName}</Typography>
            </NavLink> 
          </ListItem>
        ))}
      </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    
    </div>
    }
    </div>

  )
}

