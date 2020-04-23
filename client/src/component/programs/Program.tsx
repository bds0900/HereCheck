import React, { ReactElement, Fragment,useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery} from '@apollo/react-hooks';
import {ExpansionPanel ,ExpansionPanelSummary ,ExpansionPanelDetails ,Typography ,List,ListItem, Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink, withRouter, Route } from "react-router-dom";
import {ProgramType} from '../Interfaces'
import './programList.css'
import Course from '../courses/Course';


interface ProgramData {
    program: ProgramType;
}
  
interface ProgramVars {
    id: string;
}
interface Props {
    program:ProgramType;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

//this component get program type as props and display program infomation
export default function Program(props: Props): ReactElement {
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={props.program.id}
      >
        <Typography className={classes.heading}>{props.program.name}</Typography>
        <NavLink to={"/program/"+props.program.id}>
          <Button color="primary" variant="text">detail</Button>
        </NavLink>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <List>
        
        {props.program.courses?.map(course=>(
          <ListItem key={course.id}>
            <NavLink to={"/course/"+course.id}>
            <Typography>{course.name}</Typography>
            </NavLink> 
          </ListItem>
        ))}
        
      </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>


    </div>
  )
}

