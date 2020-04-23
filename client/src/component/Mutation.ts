import gql from "graphql-tag";

export const CREATE_STUDENT=gql`
    mutation CREATE_STUDENT(
        $id:ID!,$FirstName:String!,$lastName:String!,$password:String!,
        $email:String!,$program_id:ID){
        createStudent(data:{
            id:$id
            FirstName:$FirstName
            LastName:$lastName
            email:$email
            password:$password
            status:"full-time"
            program:{
                connect:{id:$program_id}
            }
        }){
            id
            FirstName
            LastName
            email
            program{
                name
            }
        }
    }

`;
export const UPDATE_STUDENT=gql`
    mutation UPDATE_STUDENT(
        $id:ID!,$FirstName:String!,$lastName:String!,$password:String!,
        $program_id:ID){
        updateStudent(
            where:{id:$id},
            data:{
                FirstName:$FirstName
                LastName:$lastName
                password:$password
                status:"full-time"
                program:{
                    connect:{id:$program_id}
                }
            }
        ){
            id
            FirstName
            LastName
            email

        }
    }

`;

export const CREATE_PROGRAM=gql`
    mutation CREATE_PROGRAM($id:ID!,$name:String!){
        createProgram(data:{
            id:$id
            name:$name
        }){
            id
            name
        }
    }

`;

export const UPDATE_PROGRAM=gql`
    mutation UPDATE_PROGRAM($id:ID!,$name:String!){
        updateProgram(where:{id:$id},
            data:{name:$name}
        ){
            id
            name
        }
    }

`;

export const CREATE_COURSE=gql`
    mutation CREATE_COURSE($id:ID!,$name:String!,$NOS:Int!,$program_id:ID){
        createCourse(data:{
            id:$id
            name:$name
            numOfStudent:$NOS
            program:{
                connect:{id:$program_id}
            }
        }){
            id
            name
            numOfStudent
            program{
                id
                name
            }
        }
    }

`;

export const UPDATE_COURSE=gql`
    mutation UPDATE_COURSE($id:ID!,$name:String!,$NOS:Int,$program:ID){
        updateCourse(where:{id:$id},
            data:{
                name:$name
                numOfStudent:$NOS
                program:{
                    connect:{
                        id:$program
                    }
                }
            }
        ){
            id
            name
            numOfStudent
        }
    }

`;

export const CREATE_ENROLLMENT=gql`
    mutation CREATE_ENROLLMENT($student_id:ID,$course_id:ID){
        createEnrollment(data:{
            student:{
                connect:{
                    id:$student_id
                }
            }
            course:{
                connect:{
                    id:$course_id
                }
            }
        }){
            student{
                id
            }
            course{
                id
                name
                program{
                    name
                }
            }
        }

    }


`;

export const CREATE_FACULTY=gql`
    mutation CREATE_FACULTY(
        $id:ID!,$FirstName:String!,$lastName:String!,$password:String!,
        $email:String!,$program_id:ID){
        createFaculty(data:{
            id:$id
            FirstName:$FirstName
            LastName:$lastName
            email:$email
            password:$password
            status:"USER"
            program:{
                connect:{id:$program_id}
            }
        }){
            id
            FirstName
            LastName
            email
            program{
                name
            }
        }
    }

`;
export const LOGIN=gql`
    mutation LOGIN($email:String!,$password: String!){
        login(data:{
            email: $email
            password: $password
        }){
            Faculty{
                id,
                FirstName,
                LastName,
                email
                status
            },
            token
        }
    }
`;

export const CREATE_INSTRUCTING=gql`
    mutation CREATE_INSTRUCTING($faculty_id:ID,$course_id:ID){
        createInstructing(data:{
            faculty:{
                connect:{id:$faculty_id}
            }
            course:{
                connect:{id:$course_id}
            }
        }){
            faculty{
                id
            }
            course{
                id
                name
                program{
                    name
                }
            }
        }
    }
`;
export const UPDATE_FACULTY=gql`
    mutation UPDATE_FACULTY(
        $id:ID!,$FirstName:String!,$lastName:String!,$password:String!,
        $program_id:ID){
        updateFaculty(
            where:{id:$id},
            data:{
                FirstName:$FirstName
                LastName:$lastName
                password:$password
                status:"USER"
                program:{
                    connect:{id:$program_id}
                }
            }
        ){
            id
            FirstName
            LastName
            email
            status
        }
    }

`;
export const CREATE_CLASS=gql`
    mutation CREATE_CLASS($course_id:ID,$room:String!,$start:String!,$end:String!){
        createClass(data:{
            room:$room
            startTime:$start
            endTime:$end
            course:{
                connect:{id:$course_id}
            }
        }){
            id
            room
            startTime
            endTime
        }
    }
`;
