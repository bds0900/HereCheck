import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./component/signup/Home";
import Login from "./component/signup/Login";
import CreateStudent from "./component/students/CreateStudent";
import ProgramList from "./component/programs/ProgramList";
import ProgramDetail from "./component/programs/ProgramDetail";
import CourseList from "./component/courses/CourseList";
import Course from "./component/courses/Course";
import StudentList from "./component/students/StudentList";
import Student from "./component/students/Student";
import CreateProgram from "./component/programs/CreateProgram";
import CreateCourse from "./component/courses/CreateCourse";
import FacultyList from "./component/faculties/FacultyList";
import Faculty from "./component/faculties/Faculty";
import CreateFaculty from "./component/faculties/CreateFaculty";
import InstructingList from "./component/instructing/InstructingList";
import ClassList from "./component/classes/ClassList";
import ClassPage from "./component/classes/ClassPage"
interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.FunctionComponent<RouteProps> = (childProps) =>
  <Switch>
    <Route path="/home" exact render={(props) => <Home {...props} {...childProps} />}/>
    <Route path='/login' exact render={(props) => <Login {...props} {...childProps} />}/>

    <Route path="/create/program" exact component={CreateProgram} />
    <Route path="/create/course" exact component={CreateCourse} />
    <Route path="/create/faculty" exact component={CreateFaculty} />
    <Route path="/create/student" exact component={CreateStudent} />

    <Route path="/programs" exact component={ProgramList} />
    <Route path="/courses" exact component={CourseList} />
    <Route path="/faculties" exact component={FacultyList} />
    <Route path="/students" exact component={StudentList} />
    

    <Route path="/program/:id" exact component={ProgramDetail} />
    <Route path="/course/:id" exact component={Course} />
    <Route path="/faculty/:id" exact component={Faculty} />
    <Route path="/student/:id" exact component={Student} />
    <Route path="/instructing/:id" exact component={InstructingList} />
    <Route path="/classes/:id" exact component={ClassList} />
    <Route path="/classpage/:id" exact component={ClassPage}/>

    <Route path="/" >Not Found</Route>
  </Switch>;