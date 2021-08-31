import axios from 'axios';

import { store } from '../index'
import { updateLoadingValue } from '../actions/loading-value'

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url,
    {
        onDownloadProgress:  progressEvent => {
            let loadingValue =  Math.floor(progressEvent.loaded / progressEvent.total * 100);
            store.dispatch(updateLoadingValue(loadingValue))
        }
    });
export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);