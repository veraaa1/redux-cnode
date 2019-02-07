import { GET_COLLECT } from '../constants';
export const collect = (state = [], action) => {
    switch (action.type) {
        case GET_COLLECT:
            return action.collect
        default:
            return state
    }
}