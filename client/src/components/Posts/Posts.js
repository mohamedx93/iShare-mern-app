import React, { useEffect, useState } from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CircularProgressWithLabel from './CircularProgressWithLabel'
import useStyles from './styles';

export default function Posts({ setCurrentId }) {

    const posts = useSelector((state) => state.posts);
    const loadingValue = useSelector((state) => state.loadingValue);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    // const [loadingValue, setLoadingValue] = useState(0)
    
    useEffect(() => { setLoading(loadingValue < 100) }, [loadingValue])



    return (
        loading ? <CircularProgressWithLabel value={loadingValue} /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map(post => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}
