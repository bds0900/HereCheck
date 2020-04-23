import React, { ReactElement,useState } from 'react'

import { useMutation} from '@apollo/react-hooks';
import {TextField, Button} from '@material-ui/core';

import {ProgramType} from '../Interfaces'
import {UPDATE_PROGRAM}from '../Mutation'
import './programList.css'



interface ProgramData {
    updateProgram: ProgramType;
}
  
interface ProgramVars {
    id: string;
    name:string;
}
interface Props {
    program:ProgramType;
}


//this component get program type as props and display program infomation
export default function UpdateProgram(props: Props): ReactElement {

  
  const [name, setName] = useState(props.program.name)
  const [id, setID] = useState(props.program.id)

  const [saveProgram, { error, data }]=  useMutation<ProgramData,ProgramVars>(
    UPDATE_PROGRAM,
    {variables:{id:id,name:name}}
  )

  return (
    <div>
    <h3>Update a Program</h3>
        {error ? <p>Oh no! {error.message}</p> : null}
        {data && data.updateProgram ? 
            <p>Saved!</p> : 


    <div className="CreateProgram">
    <TextField
    placeholder="Enter the Program name"
    label="Program Name"
    value={name}
    onChange={e=>setName(e.target.value)}
    />
    <br/>
    <TextField disabled
    placeholder="Enter program ID"
    label="Program ID"
    value={id}
    onChange={e=>setID(e.target.value)}
    />
    <br/>
    <Button color="primary" variant="text" onClick={() => id && name &&  saveProgram()}>
        Update Program
    </Button>
    </div>


        }

    </div>
  )
}

