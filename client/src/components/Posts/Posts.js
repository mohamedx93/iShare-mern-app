import React, { useEffect, useState } from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress, Typography } from '@material-ui/core'
// import CircularProgressWithLabel from './CircularProgressWithLabel'
import useStyles from './styles'

export default function Posts ({ setCurrentId }) {
  const classes = useStyles()
  const { posts, isLoading } = useSelector((state) => state.posts)
  // const loadingValue = useSelector((state) => state.loadingValue);
  // const [loading, setLoading] = useState(true)
  // const [loadingValue, setLoadingValue] = useState(0)

  // useEffect(() => { setLoading(!posts||posts?.length<1) }, [posts, posts?.length])

  console.log('posts Component', isLoading)
  if (!isLoading && !posts?.length) {
    return (
      <Typography variant='h3' color='textSecondary'>No posts</Typography>
    )
  }

  return (
  // loading ? <CircularProgressWithLabel value={loadingValue} /> : (
    isLoading ? <CircularProgress /> : (
      <Grid
        className={classes.mainContainer} container alignItems='stretch'
        spacing={3}
      >
        {
                    posts.map(post => (
                      <Grid key={post._id} item sm={12} md={4} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                      </Grid>
                    ))
                }
      </Grid>
    )
  )
}
