import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ClassType } from '../Interfaces'
import { GET_CLASSES_BY_COURSE } from '../Query'
import Class from './Class'
interface Props {
    match:any
}
interface ClassListData{
    classes:ClassType[]
}
export default function ClassList(props: Props): ReactElement {
    const course_id=props.match.params.id
    const {loading,data}=useQuery<ClassListData,{}>(
        GET_CLASSES_BY_COURSE,
        {variables:{course_id:course_id}}
    )
    return (
        <div>
            {loading?
            <div>loading...</div>
                :
            <div>
            {data && data.classes && data.classes.map(clas=>(
                <Class class={clas}/>
            ))}
            </div>
            }
        </div>
    )
}
