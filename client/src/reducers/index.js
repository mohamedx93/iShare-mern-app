import { combineReducers } from "redux";
import posts from './posts'
import loadingValue from './loadingValue'

export default combineReducers({
    loadingValue,
    posts,
})