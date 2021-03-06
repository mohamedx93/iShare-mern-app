import React, { useCallback, useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core'
// import { Link } from 'react-router-dom';
import useStyles from './styles'
import iShareLogo from '../../images/logo.svg'
import { FONTS } from '../../constants/themeConstants.js'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes'
import { useHistory, Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import decode from 'jwt-decode'

function Navbar() {
  const [user, setUser] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  // const stableDispatch = useCallback(dispatch, [dispatch])
  // const stableHistory = useCallback(history, [history])
  const logout = useCallback(() => {
    
    dispatch({ type: LOGOUT })
    history.push('/')
    setUser(null)
    // eslint-disable-next-line
    },[])


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  useEffect(() => {
    const isExpiredToken = () => {
      let isExpired = false
      let decodedData
      const token = user?.token
      if (!token) return false
      const dateNow = new Date().getTime()
      decodedData = decode(token)
      
      if (decodedData.exp*1000 < dateNow) isExpired = true
      return isExpired
    }
    if (isExpiredToken()) logout()
  }, [logout, user])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={iShareLogo} alt='icon' height='60px' />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.navBarRight}>
            <div className={classes.profile}>
              <Avatar
                className={classes.avatar}
                alt={user.result.name}
                src={user.result.imageUrl}
              />
              <Typography className={classes.userName} variant='h6'>
                {user.result.name}
              </Typography>
            </div>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='secondary'

            style={{ fontSize: '18px', fontWeight: '500', fontFamily: FONTS.RALEWAY }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
