import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

export default function App() {

    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Switch>
                    <Route component={Home} exact path='/' />
                    <Route component={Auth} exact path='/auth' />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}
