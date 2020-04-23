import gql from "graphql-tag";

export const GET_STUDENTS = gql`
{
  students{
    id
    FirstName
    LastName
  }
}
`;
export const GET_STUDENT=gql`
    query GET_STUDENT($student_id:ID){
    student(where:{id:$student_id}){
        id
        FirstName
        LastName
        email
        status
        program{
            id
            name
        }
        enrollments{
            id
            course{
                id
                name
                attendances{
                    time
                }
                classes{
                    room
                    startTime
                    endTime
                }
            }
        }
    }
  }
`;

export const GET_STUDENTS_BY_COURSE=gql`
    query GET_STUDENTS_BY_COURSE($course_id:ID){
        students(orderBy:LastName_ASC,
        where:{enrollments_some:{course:{id:$course_id}}}){
            id
            FirstName
            LastName
            email
        }
    }
`;


export const GET_INSTRUCTINGS=gql`
    query GET_INSTRUCTINGS($faculty_id:ID){
        instructings(where:{faculty:{id:$faculty_id}}){
            course{
                name
                id
            }
        }
    }
`;





export const GET_PROGRAMS = gql`
{
  programs(orderBy:name_ASC) {
    id
    name
    courses{
      id
      name
    }
  }
}
`;
export const GET_PROGRAMS_BY_FAULTY_ID = gql`
query GET_PROGRAMS_BY_FAULTY_ID($id:ID){
  programs(orderBy:name_ASC
  where:{
      faculties_some:{
          id:$id
      }
  }) {
    id
    name
    courses{
      id
      name
    }
  }
}
`;

export const GET_PROGRAM = gql`
query GET_PROGRAM($id:ID){
  program(where:{id:$id}){
    id
    name
    courses{
      id
      name
    }
  }
}
`;









export const GET_COURSES = gql`
  {
    courses {
      id
      name
    }
  }
`;

export const GET_COURSES_BY_PROGRAM_ID = gql`
  query GET_COURSES_BY_PROGRAM_ID($program_id:ID)
  {
    courses(where:{
        program:{
            id:$program_id
        }
    }){
      id
      name
    }
  }
`;
export const GET_COURSES_BY_FACULTY_ID = gql`
  query GET_COURSES_BY_FACULTY_ID($id:ID) {
    courses(where: {
        instructings_some:{
            faculty:{
                id:$id
            }
        }}) {
      id
      name
      numOfStudent
      program{
        name
      }
      enrollments{
        student{
          id
          FirstName
          LastName
        }
        course{
            classes{
                id
                room
                startTime
                endTime
            }
        }
      }
      classes{
          id
          room
          startTime
          endTime
      }

    }
  }
`;
export const GET_COURSE = gql`
  query Get_COURSE($coure_id: ID!) {
    course(where: {id:$coure_id}) {
      id
      name
      numOfStudent
      program{
        name
      }
      enrollments{
        student{
          id
          FirstName
          LastName
        }
        course{
            classes{
                id
                room
                startTime
                endTime
            }
        }
      }
      classes{
          id
          room
          startTime
          endTime
      }

    }
  }
`;







export const GET_FACULTIES=gql`
    query{
        faculties{
            id
            FirstName
            LastName
            email
            status
            instructings{
                id
                course{
                    name
                    attendances{
                        time
                    }
                    classes{
                        room
                        startTime
                        endTime
                    }
                }
            }
            program{
                id
                name
            }
            
        }
    }
`;
export const  GET_FACULTY=gql`
    query($faculty_id:ID){
        faculty(where:{id:$faculty_id}){
            id
            FirstName
            LastName
            email
            status
            instructings{
                id
                course{
                    name
                    attendances{
                        time
                    }
                    classes{
                        room
                        startTime
                        endTime
                    }
                }
            }
            program{
                id
                name
            }

        }
    }

`;
export const  GET_FACULTY_BY_EMAIL=gql`
    query($faculty_id:ID){
        faculty(where:{id:$faculty_id}){
            id
            FirstName
            LastName
            email
            status
            instructings{
                id
                course{
                    name
                    attendances{
                        time
                    }
                    classes{
                        room
                        startTime
                        endTime
                    }
                }
            }
            program{
                id
                name
            }

        }
    }

`;


export const GET_COURSE_ATTENDANCE=gql`
    query GET_COURSE_ATTENDANCE($course_id:ID){
        attendances(where:{course:{id:$course_id}}){
            id
            student{
                FirstName
                LastName
                id
            }
            time
        }
    }
`;

export const GET_CLASS_ATTENDANCE=gql`
    query GET_CLASS_ATTENDANCE($class_id:ID){
        attendances(where:{class:{id:$class_id}}){
            student{
                FirstName
                LastName
                id
            }
            time
        }
    }
`;
export const GET_STUDENT_COURSE_ATTENDANCE=gql`
    query GET_CLASS_ATTENDANCE($course_id:ID,$student_id:ID){
        attendances(where:{
            student:{id:$student_id},
            course:{id:$course_id}
            }){
            id
            student{
                FirstName
                LastName
            }
            class{
                id
            }
            time
        }
    }
`;
export const GET_CLASSES=gql`
    query GET_CLASSES{
        classes{
            id
            startTime
            endTime
            course{
                id
                name
                attendances{
                    course{
                        name
                    }
                }
            }
        }
    }
`;
export const GET_CLASS=gql`
    query GET_CLASS($class_id:ID){
        class(where:{id:$class_id}){
            startTime
            endTime
            room
            course{
                id
                name
                attendances{
                    course{
                        name
                    }
                }
                enrollments{
                    student{
                        id
                        FirstName
                        LastName
                    }
                }
            }
        }
    }
`;
export const GET_CLASSES_BY_COURSE=gql`
    query GET_CLASSES_BY_COURSE($course_id:ID){
        classes(where:{course:{id:$course_id}}){
            startTime
            endTime
            course{
                id
                name
                attendances{
                    course{
                        name
                    }
                }
            }
        }
    }
`;