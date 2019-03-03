import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {getAuthor} from '../../actions'
import './currentuserinfo.scss'
class CurrentUserInfo extends Component {
    state={
        val:''
    }
    
    componentDidMount() {
        const {getAuthor}=this.props
        const{user}=this.props.match.params
        if(user){
            getAuthor(user)
        }
        
    }
    
    render() {
        const {val}=this.state
        const{topic,author}=this.props
        const{user,topicid}=this.props.match.params
        return (
            <div>
                {!sessionStorage.name && ((!topicid && !user) ) ?<div className="login-state">
                    <p className="titles">登录</p>
                    <div>
                        <div className="user-info">
                            <div className="login">
                                <input type="text" value={val} onChange={this.changeVal}/><button onClick={this.chackUser}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>:<></>}
                {sessionStorage.name && (!topicid && !user)?<div className="user-state">
                    <p className="titles">个人信息</p>
                    <div>
                        <div className="user-info">
                        <Link to={`/user/${sessionStorage.name}`}>
                            <img src={sessionStorage.pic} alt=""/>
                            </Link>
                            <span>{sessionStorage.name}</span>
                            <button onClick={this.loginOut}>退出</button>
                        </div>
                    </div>
                    <div className="create-topic">
                   <Link to="/create">发布话题</Link>
                    </div>
                </div>:<></>}
                {author  &&(user)?<div className="author-state">
                    <p className="titles">作者信息</p>
                    <div>
                        <div className="user-info">
                        <Link to={`/user/${author.loginname}`}>
                        <img src={author.avatar_url} alt=""/>  
                        </Link>
                        <span>{author.loginname}</span>
                        <p className="score">积分：{author.score}</p>
                        </div>
                        </div>
                    </div>:<></>}
                    {topic && this.props.match.params.topicid?<div className="author-state">
                    <p className="titles">作者信息</p>
                    <div>
                     <div className="user-info">
                       <Link to={`/user/${topic.author.loginname}`}><img src={topic.author.avatar_url}    alt=""/></Link>
                       <span>{topic.author.loginname}</span> 
                    </div>
                    </div>
                    </div>
                    :<></>}
                {/* <p className="titles">{topic||user?'作者信息':sessionStorage.name?'个人信息':'登录'}</p>
                <div>{
                    author?<div className="user-info">
                    <Link to={`/user/${author.loginname}`}>
                      <img src={author.avatar_url}/>  
                      </Link>
                      <span>{author.loginname}</span>
                      <p className="score">积分：{author.score}</p>
                    </div>:topic?<div className="user-info">
                       <Link to={`/user/${topic.author.loginname}`}><img src={topic.author.avatar_url}/></Link>
                       <span>{topic.author.loginname}</span> 
                    </div>:
                    sessionStorage.name?<div className="user-info">
                     <Link to={`/user/${sessionStorage.name}`}>
                        <img src={sessionStorage.pic} alt=""/>
                        </Link>
                        <span>{sessionStorage.name}</span>
                        <button onClick={this.loginOut}>退出</button>
                    </div>:<div className="login"><input type="text" value={val} onChange={this.changeVal}/><button onClick={this.chackUser}>登录</button></div>
                    
                }
                </div> */}
            </div>
        );
    }
    changeVal=(event)=>{
       this.setState({
           val:event.target.value
       })
    }
    chackUser=()=>{
        Axios.post(`https://cnodejs.org/api/v1/accesstoken`,{accesstoken:this.state.val}).then(res=>{
            console.log(res.data)
            sessionStorage.token = this.state.val
            sessionStorage.name = res.data.loginname
            sessionStorage.pic = res.data.avatar_url
            sessionStorage.id =res.data.id
            this.setState({
                userInfo:res.data
            })

        }).catch(res=>{
            alert(res.error_msg)
            this.setState({
                val:''
            })
        })
    }
    loginOut=()=>{
        sessionStorage.clear()
        this.setState({
            userInfo:null,
            val:''
        })
    }
}
const mapStateToProps = (state, ownProps) => ({
    topic:state.topic,
    author:state.user
})

export default connect(mapStateToProps,{getAuthor})(CurrentUserInfo);