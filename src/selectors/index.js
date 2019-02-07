import axios from "axios";

export const getNotReadNum = ()=>{
    axios.get(`https://cnodejs.org/api/v1/message/count`,{accesstoken:sessionStorage.token}).then(res=>{
        return res.data.data
    })
}

export const getCollectNum = (user)=>{
    
    axios.get(`https://cnodejs.org/api/v1/topic_collect/${user}`).then(res=>{
        console.log(res.data.data.length);
        
        return res.data.data.length
    })
}