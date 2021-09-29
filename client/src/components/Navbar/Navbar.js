import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core'
// import { Link } from 'react-router-dom';
import useStyles from './styles'
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes'
import { useHistory, Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import decode from 'jwt-decode';

function Navbar() {
    const [user, setUser] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const isExpiredToken = () => {
        let isExpired = false;
        let decodedData;
        const token = user?.token;
        if (!token) return false;
        decodedData = decode(token);
        const dateNow = new Date();
        
        if (decodedData.exp < dateNow.getTime()) isExpired = true;
        return isExpired;
    }
    const logout = () => {
        dispatch({ type: LOGOUT });
        history.push('/')
        setUser(null);
    };

    const signIn = () => {

    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    
    useEffect(() => {
        if (isExpiredToken) logout();
    }, []);


    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl} />
                        <Typography className={classes.userName} variant='h6'>
                            {user.result.name}
                        </Typography>
                        <Button variant='contained'
                            className={classes.logout}
                            color='secondary'
                            onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to='/auth'
                        variant='contained'
                        color='primary'
                        onClick={signIn}>
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
