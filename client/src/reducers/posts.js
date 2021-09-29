import { UPDATE, FETCH_ALL, CREATE, LIKE, DELETE } from '../constants/actionTypes'


export default function reducers(posts = [], action) {
    switch (action.type) {
        case UPDATE:
        case LIKE:
            return posts.map(post =>
                post._id === action.payload._id ? action.payload : post);

        // return posts;
        // return posts.map(post =>
        //     post._id === action.payload.id &&
        //         post.likeCount !== action.payload.likeCount ?
        //         action.payload : post);

        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...posts, action.payload];

        case DELETE:
            return posts.filter(post => post._id !== action.payload);

        default:
            return posts;
    }
}