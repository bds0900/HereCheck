import React, { Fragment, ReactElement } from 'react'
import { Breadcrumbs, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Role } from '../Interfaces';
import Nav from '../Nav'
import logo from '../../logo.png';
interface Props {
    isAuthenticated: boolean;
    userHasAuthenticated: (authenticated: boolean) => void;
}

const Home = (props: Props):ReactElement => {

    return (
        <Fragment>
            <img src={logo} alt="home" />
        </Fragment>
    )
    
}

export default Home
