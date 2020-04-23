import React, { ReactElement, Fragment } from 'react'
import gql from 'graphql-tag';
import { useLazyQuery ,useQuery} from '@apollo/react-hooks';
import Program from './Program'
import {List,ListItem,Collapse,Typography} from '@material-ui/core';
import {ProgramType} from '../Interfaces'
import './programList.css'
import {GET_PROGRAMS, GET_PROGRAMS_BY_FAULTY_ID} from '../Query'

interface ProgramListData {
    programs: ProgramType[];
}
  
interface ProgramListVars {

}
interface Props {
    
}
export default function ProgramList({}: Props): ReactElement {

    const role=localStorage.getItem('role')
    const id=localStorage.getItem('id')
    const QERUY=role=='USER'?GET_PROGRAMS_BY_FAULTY_ID:GET_PROGRAMS
    console.log(QERUY)
    const { loading, data } = useQuery<ProgramListData,ProgramListVars>(QERUY,{variables:{id:id}});

    return (
        <Fragment>
        {loading ? (
            <p>Loading ...</p>
          ) : (
            <Fragment>
            <List>
            {data && data.programs.map(program => (
                <ListItem key={program.id} className="program-list"> <Program program={program}/> </ListItem>

            ))}
            </List>
            </Fragment>
          )}
        </Fragment>
    )
}




