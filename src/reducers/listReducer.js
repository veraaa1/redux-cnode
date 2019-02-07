import { GET_LISTS } from '../constants';
const listReducer = (state = [], action) => {
    switch (action.type) {
        case GET_LISTS:
            return action.lists
        default:
            return state
    }
}
export default listReducer