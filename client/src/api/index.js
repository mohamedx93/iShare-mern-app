import axios from 'axios'
// import { createWriteStream, createReadStream } from 'fs';

import { store } from '../index'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
}, (error) => (Promise.reject(error)))

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&searchTags=${searchQuery.searchTags}`)
export const createPost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)

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
