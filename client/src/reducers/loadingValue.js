export default function reducers(loadingValue = 0, action) {
    switch (action.type) {
        case 'loading/updateValue':
            return action.payload;
        case 'loading/resetValue':
            return action.payload;
        default:
            return loadingValue;
    }
}