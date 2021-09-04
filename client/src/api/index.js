import axios from 'axios';
// import { createWriteStream, createReadStream } from 'fs';

import { store } from '../index'
import { updateLoadingValue } from '../actions/loading-value'
// const writer = createWriteStream('./posts.json');

const url = 'http://localhost:5000/posts';



export const fetchPosts = () => axios.get(url,
    {
        onDownloadProgress:  (progressEvent) => {
            let loadingValue =  Math.floor(progressEvent.loaded / progressEvent.total * 100);
            store.dispatch(updateLoadingValue(loadingValue));
        }
    });
export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id,likes) => axios.patch(`${url}/${id}/${likes}/likePost`);



// const method = 'GET';

// export const fetchPosts = () => axios.request({
//     url,
//     method,
//     responseType: 'stream',
//     onDownloadProgress: progressEvent => {
//         let loadingValue = Math.floor(progressEvent.loaded / progressEvent.total * 100);
//         store.dispatch(updateLoadingValue(loadingValue))
//     }
// })
//     .then((response) => {
//         return new Promise((resolve, reject) => {
//             response.data.pipe(writer);
//             let error = null;
//             writer.on('error', err => {
//                 error = err;
//                 writer.close();
//                 reject(err);
//             });
//             writer.on('close', () => {
//                 if (!error) { resolve(true); }
//             })
//         }).then(try {
//             await 
//         } catch (error) {
            
//         })
//     })