import { UPDATE, FETCH_ALL, CREATE, LIKE, LIKE_FRONTEND, DELETE } from '../constants/actionTypes'
export default function reducers(posts = [], action) {
    switch (action.type) {
        case UPDATE:
            return posts.map(post => post._id === action.payload.id ? action.payload : post);

        case LIKE:
            return posts;
        // return posts.map(post =>
        //     post._id === action.payload.id &&
        //         post.likeCount !== action.payload.likeCount ?
        //         action.payload : post);
        case LIKE_FRONTEND:
            return posts.map(post =>
                post._id === action.payload ?
                    { ...post, likeCount: post.likeCount + 1 } : post);

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