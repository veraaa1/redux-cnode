import { GET_TOPIC,CHANGE_COLLECT ,CHANGE_UPS,ADD_COMMENT, ADD_REPLY,CREATE_TOPIC,UPDATE_TOPIC} from '../constants/index';
 const topic = (state = null, action) => {
    switch (action.type) {
        case GET_TOPIC:
            return action.topic
        case CHANGE_COLLECT:
        const newState = {...state}
        newState.is_collect = action.isCollect
        return newState
        case CHANGE_UPS:
        return action.topic
        case ADD_COMMENT:
        return action.topic
        case ADD_REPLY:
        return action.topic
        case CREATE_TOPIC:
        return action.topic
        case UPDATE_TOPIC:
        return action.topic
        default:
            return state
    }
}
export default topic