import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import theme from './Theme.js'

export default function App () {
  const user = JSON.parse(localStorage.getItem('profile'))?.result
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth='xl'>
          <Navbar />
          <Switch>
            <Route path='/' exact component={() => <Redirect to='/posts' />} />
            <Route path='/posts' exact component={Home} />
            <Route path='/posts/search' exact component={Home} />
            <Route path='/posts/:id' component={PostDetails} />
            <Route
              path='/auth' exact
              component={() => !user ? <Auth /> : <Redirect to='/posts' />}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}
