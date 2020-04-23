import React, { ReactElement, useState } from 'react'
import {TextField,Button,FormControl} from '@material-ui/core'
import gql from 'graphql-tag';
import { useMutation  } from '@apollo/react-hooks';

import {ProgramType} from '../Interfaces'
import {CREATE_PROGRAM} from '../Mutation'
interface Props {
    
}


interface ProgramData{
    createProgram:ProgramType
}
interface ProgramVars {
    id: string;
    name:string;
}

export default function CreateProgram({}: Props): ReactElement {
    const [name, setName] = useState("")
    const [id, setID] = useState("")

    

    const [saveProgram, { error, data }]=  useMutation<ProgramData,ProgramVars>(
        CREATE_PROGRAM,
        {variables:{id:id,name:name}}
    )


    return (
        <div>
        <h3>Add a Program</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.createProgram ? 
            <p>Saved!</p> : 
         
            <div className="CreateProgram">
            <TextField
            placeholder="Enter the Program name"
            label="Program Name"
            value={name}
            onChange={e=>setName(e.target.value)}
            />
            <br/>
            <TextField
            placeholder="Enter program ID"
            label="Program ID"
            value={id}
            onChange={e=>setID(e.target.value)}
            />
            <br/>
            <Button color="primary" variant="text" onClick={() => id && name &&  saveProgram()}>
                Create Program
            </Button>
            </div>
            }

        </div>
    )
}
