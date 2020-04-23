import React, { ReactElement, useState } from 'react'
import { Select, MenuItem, InputLabel, makeStyles } from '@material-ui/core'
import { ProgramType } from '../Interfaces'

interface Props {
    programs:ProgramType[]|undefined
    onProgramClick:any
}

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 150
    },
    marginTop: {
        marginTop: 20
    }
  }));

export default function SelectProgram(props: Props): ReactElement {
    const classes = useStyles()

    const programs=props.programs;
    const [program,setProgram]=useState<string>();
    
    

    return (
        <div className={classes.marginTop}>
        <InputLabel >Program</InputLabel>
        <Select className={classes.select} value={program} onChange={e=>{
            setProgram(e.target.value as string)
            props.onProgramClick(e.target.value as string)
        }}>
        {
            programs?.map(program=>(
                <MenuItem  key={program.id} value={program.id}>
                    {program.name}
                </MenuItem >
            ))
        }
        </Select>
        </div>
    )
}
