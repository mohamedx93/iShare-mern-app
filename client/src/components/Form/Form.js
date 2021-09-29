import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'



export default function Form({ currentId, setCurrentId }) {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: '',
    })
    const selectedPost = useSelector(state =>
        currentId ? state.posts.posts.find(p => p._id === currentId) : null
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (selectedPost) setPostData(selectedPost)
    }, [selectedPost])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData));
        }
        else {
            dispatch(createPost({ ...postData, creatorName: user?.result?.name }));
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '', message: '', tags: '', selectedFile: '',
        });
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories and like other's memories 
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} action="">
                <Typography variant="h6">{!currentId ? 'Creating' : 'Editing'} a Memory</Typography>
                <TextField fullWidth variant='outlined' name='title' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField fullWidth variant='outlined' name='message' label='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField fullWidth variant='outlined' name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    <img width='48px' height='48px' src={postData.selectedFile} alt="thumbnail" />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='outlined' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
                {/* <Button m={2} variant='outlined' color='inherit' size='small' onClick={() =>
                {
                    console.log('button clicked ', i);
                    setI(i + 1);
                }} fullWidth>Log</Button> */}
            </form>
        </Paper>
    )
}
