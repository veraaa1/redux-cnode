import { GET_Msg } from '../constants/index';
export const msg = (state = [], action) => {
    switch (action.type) {
        case GET_Msg:
            return action.msg
        default:
            return state
    }
}