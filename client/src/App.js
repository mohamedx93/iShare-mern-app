import React from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import memories from './images/memories.png'

export default function App() {
    return (
        <Container>
            <AppBar position='static' color='inherit'>
                <Typography variant='h2' align='center'>Memories</Typography>
                <img src={memories} alt="memories" height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch"></Grid>
                </Container>
                
            </Grow>
        </Container>
    )
}
