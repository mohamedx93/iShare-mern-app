import { UPDATE, FETCH_ALL, FETCH_POST, CREATE, LIKE, DELETE, SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes'

export default function reducers (state = { posts: [], isLoading: true }, action) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }

    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post)
      }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }

    case FETCH_POST:
      return {
        ...state, post: action.payload
      }
    case SEARCH:
      return {
        ...state, posts: action.payload
      }

    case CREATE:
      return { ...state, posts: [action.payload, ...state.posts] }

    case DELETE:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }

    default:
      return state
  }
}
