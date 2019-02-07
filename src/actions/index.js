import axios from 'axios'
import * as types from '../constants';
export const getLists =(page,tab)=>{
    
        return dispatch=>{
            axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}`).then(res=>{ 
            dispatch({
                type:types.GET_LISTS,
                lists:res.data.data
            })
        })
        }
    
}
export const getTopics = (id)=>{
    return dispatch=>{
        axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res=>{
            dispatch({
                type:types.GET_TOPIC,
                topic:res.data.data
            })
        })
    }
}
export const userInfoCheck =(name)=>{
    return dispatch=>{
        axios.get(`https://cnodejs.org/api/v1/user/${name}`).then(res=>{
            dispatch({
                type:types.GET_USER,
                users:res.data.data
            })
        })
    }
}
export const isCollect = (iscollect,id)=>{
    console.log(iscollect,id)
    return dispatch=>{
        if(!iscollect){
            axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`,{accesstoken:sessionStorage.token,topic_id:id}).then(res=>{
                console.log(res.data)
                dispatch({
                    type:types.CHANGE_COLLECT,
                    isCollect:!iscollect
                })
            })
        }else{
            axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`,{accesstoken:sessionStorage.token,topic_id:id}).then(res=>{
                dispatch({
                    type:types.CHANGE_COLLECT,
                    isCollect:!iscollect
                })
            }) 
        }
            
        
            
    }
}
export const ups = (replyid,id)=>{
    return dispatch=>{
        axios.post(`https://cnodejs.org/api/v1/reply/${replyid}/ups`,{accesstoken:sessionStorage.token}).then(res=>{
            axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res=>{
                dispatch({
                    type:types.CHANGE_UPS,
                    topic:res.data.data
                })
            })
            
        }).catch(res=>{
            alert('不能帮自己点赞哦')
        })
    }
}

export const addComment =(id,val,clear)=>{
    return dispatch=>{
        if(val.trim()){
            axios.post(`https://cnodejs.org/api/v1/topic/${id}/replies`,{accesstoken:sessionStorage.token,content:val}).then(res=>{
                console.log(res.data);
             axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res=>{
                dispatch({
                    type:types.ADD_COMMENT,
                    topic:res.data.data
                })
                clear()
             })   
            
        })
        }else{
            alert('不正当评论！')
        }
        
    }
}
export const replyComment = (postId,val,replyid,finish)=>{
    return dispatch=>{
        if(val.trim()){
            axios.post(`https://cnodejs.org/api/v1/topic/${postId}/replies`,{accesstoken:sessionStorage.token,content:val,reply_id:replyid}).then(res=>{
                console.log(res.data);
             axios.get(`https://cnodejs.org/api/v1/topic/${postId}`).then(res=>{
                dispatch({
                    type:types.ADD_REPLY,
                    topic:res.data.data
                })
                finish()
             })   
            
        })
        }else{
            alert('不正当评论！')
        }
        
    }
    }

export const getAuthor=(user)=>{
    // const{user}=this.props.match.params
    console.log(user);
    
    return dispatch=>{
        axios.get(`https://cnodejs.org/api/v1/user/${user}`).then(res=>{
            dispatch({
                type:types.GET_AUTHOR,
                author:res.data.data
            }) 
    })
    }
    
}
export const createTopic =(title,tab,content)=>{
    return dispatch=>{
        axios.post(`https://cnodejs.org/api/v1/topics`,{accesstoken:sessionStorage.token,title:title,tab:tab,content:content}).then(res=>{
            axios.get(`https://cnodejs.org/api/v1/topic/${res.data.topic_id}`).then(res=>{
                dispatch({
                    type:types.CREATE_TOPIC,
                    topic:res.data.data
                })
            })
        })
    }
}
export const updateTopic = (id,title,tab,content)=>{
    return dispatch=>{
        axios.post(`https://cnodejs.org/api/v1/topics/update`,{accesstoken:sessionStorage.token,title:title,tab:tab,content:content,topic_id:id}).then(res=>{
            axios.get(`https://cnodejs.org/api/v1/topic/${res.data.topic_id}`).then(res=>{
                dispatch({
                    type:types.UPDATE_TOPIC,
                    topic:res.data.data
                })
            })
        })
    }
}

export const getMsg = ()=>{
    return dispatch=>{
        axios.get(`https://cnodejs.org/api/v1/messages`,{accesstoken:sessionStorage.token,mdrender:true}).then(res=>{
            dispatch({
                type:types.GET_Msg,
                msg:res.data.data
            })
        })
    }
}
