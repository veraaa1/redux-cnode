import { combineReducers } from 'redux';
import listReducer from './listReducer'
import topic from './topic'
import user from './user'
import {msg} from './msg'
const RootReducer = combineReducers({
listReducer,topic,user,msg
})
export default RootReducer