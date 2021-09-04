import React, { useEffect } from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePostFrontEnd, likePostBackEnd } from '../../../actions/posts';


export default function Post({ post, setCurrentId, setPost }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    // useEffect(() => {
    //     dispatch(likePostBackEnd(post._id, post.likeCount));
    // }, [post.likeCount]);
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body1'>{moment(post.createDate).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size='small' onClick={() => { setCurrentId(post._id) }}>
                    <MoreHorizIcon fontSize='medium' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => (`#${tag} `))}</Typography>
            </div>
            <Typography variant='h5' className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary'
                    onClick={() => {
                        dispatch(likePostFrontEnd(post._id));
                        dispatch(likePostBackEnd(post._id, post.likeCount+1));
                    }}>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp;Like&nbsp;
                    {post.likeCount}
                </Button>
                <Button size='small' color='primary'
                    onClick={() => { dispatch(deletePost(post._id)) }}>
                    <DeleteIcon fontSize='small' />
                    &nbsp;Delete
                </Button>
            </CardActions>
        </Card>
    )
}
