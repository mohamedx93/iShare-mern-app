import React, {useEffect, useState} from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
export default function Posts() {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        setLoading(posts.length === 0);
    console.log(posts.length)
    }
        
        , [posts])
    return (
        loading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map(post => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}
