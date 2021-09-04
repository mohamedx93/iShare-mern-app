import React, { useEffect, useState } from 'react'

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import Navbar from './components/Navbar/Navbar'
import useStyles from './styles';


export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
        console.log("currentId: ",currentId)
        dispatch(getPosts());
    }, [dispatch, currentId])

    return (
        <Container>
            <Navbar/>
            <Grow in>
                <Container >
                    <Grid className={classes.mainContainer} container spacing={3} justifyContent="space-between" alignItems="stretch">
                        <Grid item xs={12} md={5} lg={6}>
                            <Posts setCurrentId={setCurrentId}></Posts>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                        </Grid>
                    </Grid>

                </Container>
            </Grow>
        </Container>
    )
}
