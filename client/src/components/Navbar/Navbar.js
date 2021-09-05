import React from 'react'
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom';
import useStyles from './styles'
import memories from '../../images/memories.png'

function Navbar() {
    const user = null;
    const classes = useStyles();
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
                            onClick={() => { }}>
                            Logout
                        </Button>
                    </div>
                ) : (
                        <Button
                            component={Link}
                            to='/auth'
                            variant='contained'
                            color='primary'
                            onClick={() => { }}>
                            Sign In
                            </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
