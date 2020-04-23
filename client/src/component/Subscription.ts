import gql from "graphql-tag";

export const GET_ATTENDANCE_SUB=gql`
subscription GET_ATTENDANCE_SUB{
    attendance{
        mutation
        node{
            time
            student{
                id
                FirstName
                enrollments{
                    course{
                        attendances{
                            time
                        }
                    }
                }
            }
        }
    }
}

`;
export const GET_COURSE_SUB=gql`
subscription GET_COURSE_SUB{
    course{
        mutation
    }
}

`;
export const GET_CLASS_SUB=gql`
subscription GET_CLASS_SUB{
    class{
        mutation
    }
}

`;
