import React, { useState } from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom'
import Likes from './Likes'
export default function Post ({ post, setCurrentId }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const [user] = useState(JSON.parse(localStorage.getItem('profile'))?.result)

  const openPost = () => {
    history.push(`/posts/${post._id}`)
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        name='test'
        component='span'
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.creatorName}</Typography>
          <Typography variant='body1'>{moment(post.createDate).fromNow()}</Typography>
        </div>
        {(user?._id === post.creatorId || user?.googleId === post.creatorId) &&
          <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size='small' onClick={(e) => {
            e.stopPropagation();
            setCurrentId(post._id)
          }}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => (`#${tag} `))}</Typography>
        </div>
        <Typography variant='h5' className={classes.title} gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size='small' color='primary' disabled={!user}
          onClick={() => {
            dispatch(likePost(post._id))
          }}
        >
          <Likes className={classes.likesComponent} likes={post.likes} user={user} />
        </Button>
        {(user?._id === post.creatorId || user?.googleId === post.creatorId)
          ? <Button
              size='small' color='primary'
              onClick={() => { dispatch(deletePost(post._id)) }}
            >
            <DeleteIcon fontSize='small' />
                        &nbsp;Delete
            </Button> : null}
      </CardActions>
    </Card>
  )
}
