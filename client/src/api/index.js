import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url,
    {
        onDownloadProgress: progressEvent => {
            let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100);console.log('completed: ', percentCompleted)
        }
    });
export const createPost = (newPost) => axios.post(url, newPost);