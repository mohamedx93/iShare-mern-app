import React, { useEffect,  } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import useStyles from './styles'
import { getPost, getPostsBySearch } from '../../actions/posts'
import brokenImage from '../../images/no_img.png'

function PostDetails () {
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
  const dispatch = useDispatch()
  // const stableDispatch = useCallback(dispatch, [dispatch])
  const openPost = (id) => history.push(`/posts/${id}`)
  
  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])
  
  useEffect(() => {
    if (post) dispatch(getPostsBySearch({ search: 'none', searchTags: post?.tags.join(',') }))
  }, [post, dispatch])

  if (!post) return null
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>{post?.title}</Typography>
          <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{post?.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant='body1' component='p'>{post?.message}</Typography>
          <Typography variant='h6'>Created by: {post?.creatorName}</Typography>
          <Typography variant='body1'>{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || brokenImage} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, creatorName, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterButton variant='h6'>{title}</Typography>
                <Typography gutterButton variant='subtitle2'>{creatorName}</Typography>
                <Typography gutterButton variant='subtitle2'>{message}</Typography>
                <Typography gutterButton variant='subtitle1'>Likes: {likes.length}</Typography>
                <img
                  src={selectedFile} alt={brokenImage}
                  height='200px' width='200px'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails
