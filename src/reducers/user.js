import { GET_USER,GET_AUTHOR} from '../constants';
const user = (state = null, action) => {
    switch (action.type) {
        case GET_USER:
            return action.users
        case GET_AUTHOR:
            return action.author
        default:
            return state
    }
}
export default user