import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_INSTRUCTINGS } from '../Query'
import { InstructingType } from '../Interfaces'
import { List, ListItem } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

interface Props {
    faculty_id:string
}
interface InstructingData{
    instructings:InstructingType[]
}

export default function Instructing({}: Props): ReactElement {
    const {loading,data}=useQuery<InstructingData,{}>(
        GET_INSTRUCTINGS,
        {variables:{faculty_id:localStorage.getItem("id")}}
    )
    return (
        <div>
            {loading?
                <div>loading....</div>
                :
                <List>
                {data && data.instructings.map(instructing=>(
                    <ListItem button component={NavLink} to={`/classes/${instructing.course.id}`}>{instructing.course.name}</ListItem>
                ))}
                </List>
            }
        </div>
    )
}
