
export const resetLoadingValue = () => {
    return {
        type: 'loading/resetValue', payload: 0
    }
}
export const updateLoadingValue = (newValue) => {
    return {
        type: 'loading/updateValue', payload: newValue
    }
}