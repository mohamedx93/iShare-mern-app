import { combineReducers } from "redux";
import posts from './posts'
import loadingValue from './loadingValue'
import auth from './auth'
export default combineReducers({
    loadingValue,
    posts,
    auth,
})