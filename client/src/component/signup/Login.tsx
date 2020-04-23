
import {TextField,Button,FormControl} from '@material-ui/core'
import { Redirect } from 'react-router-dom';
// import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from "react-bootstrap";
//import { Auth } from "aws-amplify";
import React, { ReactElement, ReactComponentElement, useState } from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../Mutation';
import { FacultyType } from '../Interfaces';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { unstable_batchedUpdates } from 'react-dom';


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`


interface LoginProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

interface LoginState {
  loading: boolean;
  redirect: boolean;
  email: string;
  password: string;
  emailValid: "success" | "error" | "warning" | undefined;
  passwordValid: "success" | "error" | "warning" | undefined;
}
interface LoginVars {
  email: string;
  password: string;
}

interface authPayloadType {
  Faculty: FacultyType;
  token: string;
}
interface LoginData{
  login: authPayloadType
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props:LoginProps): ReactElement <LoginProps>  {

    const [loading,setLoading]=useState(false);
    const [redirect, setReirect] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState<"success" | "error" | "warning" | undefined>();
    const [passwordValid,setPasswrodValid] =useState<"success" | "error" | "warning" | undefined>();
    
    // for material ui
    const classes = useStyles();

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setEmail(target.value)
    setEmailValid(emailRegex.test(target.value.toLowerCase()) ? 'success' : 'error')
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setPassword(target.value);
    setPasswrodValid(target.value.length < 8 ? 'error' : 'success')
    
  }

  const onLogin = async (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
    event.preventDefault();
    setLoading( true );

    // try {
    //   await Auth.signIn(email, password);
    //   props.userHasAuthenticated(true);
    //   setReirect(true )
    // } catch (e) {
    //   alert(e.message);
    //   setLoading(false);
    // }
  }
  const [login, { error, data }] = useMutation<LoginData, LoginVars>(
    LOGIN,
    {variables:{email: email, password: password}}
  )
  //if get the data then save it
  if(data && data.login.token!=="Unable to login")
  {
    props.userHasAuthenticated(true);
    localStorage.setItem('token',data.login.token)
    localStorage.setItem('role',data.login.Faculty.status)
    localStorage.setItem('id',data.login.Faculty.id)
    localStorage.setItem('firstName',data.login.Faculty.FirstName)
    localStorage.setItem('lastName',data.login.Faculty.LastName)
  }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          {data && data.login.token!=="Unable to login"
            ?
            <Redirect to='/home' />
            :
          <div className="Login">
            <div className={ classes.form }>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="Enter your email"
                label="Email"
                value={email}
                onChange={onEmailChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  type="password"
                  placeholder="Enter your Password"
                  label="Password"
                  value={password}
                  onChange={onPasswordChange}
              />

                <Button
                  //type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={()=>login().catch((e) => {
                    alert("Login Failed.")
                    setPassword("")
                  })}
                  disabled={passwordValid !== 'success' || emailValid !== 'success' }
                >
                  Log in
                </Button>
            </div>
          </div>
          }
        </div>




    </Container>
    );
  
}
