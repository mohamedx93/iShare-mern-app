import * as api from '../api'
import * as actionTypes from '../constants/actionTypes'

// Action Creators

export const getPosts = (page) => async (dispatch) => {
  try {
    // console.log('get posts action')
    dispatch({ type: actionTypes.START_LOADING })
    const { data } = await api.fetchPosts(page)
    dispatch(
      { type: actionTypes.FETCH_ALL, payload: data }
    )
    dispatch({ type: actionTypes.END_LOADING })
  } catch (error) {
    console.log('post action:', error)
  }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING })
    // console.log('search posts action')
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
    dispatch({ type: actionTypes.SEARCH, payload: data })
    dispatch({ type: actionTypes.END_LOADING })
    console.log('search result:', data)
  } catch (error) {
    console.log('post action:', error)
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    // console.log('get posts action')
    dispatch({ type: actionTypes.START_LOADING })
    const { data } = await api.fetchPost(id)
    dispatch(
      { type: actionTypes.FETCH_POST, payload: data }
    )
    dispatch({ type: actionTypes.END_LOADING })
  } catch (error) {
    console.log('post action:', error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)
    dispatch({ type: actionTypes.CREATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)
    dispatch({ type: actionTypes.UPDATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const likePost = (id, likes) => async dispatch => {
  try {
    const { data } = await api.likePost(id, likes)
    dispatch({ type: actionTypes.LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: actionTypes.DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}
