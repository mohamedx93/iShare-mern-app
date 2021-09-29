import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { Grow, Container, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import {getPosts} from '../../actions/posts'
import useStyles from './styles'

function Home() {    
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
        console.log("currentId: ", currentId)
        dispatch(getPosts());
    }, [dispatch, currentId])

    return (
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
    )
}

export default Home
