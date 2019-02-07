import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getAuthor } from '../../actions';
import { getCollectNum } from '../../selectors';
import './userinfo.scss'
class UserInfo extends Component {
    componentDidMount() {
        const {getAuthor} = this.props
        const{user}=this.props.match.params
        if(user){
            getAuthor(user)
        }
        
    }
    
    render() {
        const {author,getAuthor} = this.props  
        const{user}=this.props.match.params
        console.log(getCollectNum(user));
        
        return (
            <div>
               {
                   author?<div className="personal">
                    <div className="info">
                        <p><Link to="/">主页</Link>/</p>
                        <div className="url-name">
                            <img src={author.avatar_url} alt=""/> 
                            <p>{author.loginname}</p>  
                        </div>
                        <p>积分：{author.score}</p>
                        <p>{getCollectNum(user)}个话题收藏</p>
                        <p>github 名字：{author.githubUsername}</p>
                        <p>注册时间<Moment fromNow>{author.create_at}</Moment></p>
                    </div>
                    <div className="action">
                        <p>最近创建的话题</p>
                        <ul className="lists">
                       {
                           
                           author.recent_topics.length===0?<div>无话题</div>:author.recent_topics.slice(0,5)
.map(e=><li key={e.id}><Link to={`/user/${e.author.loginname}`} className="avatar">
                        <img src={e.author.avatar_url} alt=""/></Link>
                        {/* <span className="number">
                         <span>{e.reply_count}</span>/{e.visit_count}</span> */}
                        <span className={`tab ${e.top?'active-tab':e.good?'active-tab':''}`}>{e.top?'置顶':e.good?'精华':e.tab==='share'?'分享':e.tab==='job'?'招聘':'问答'}</span>
                           <Link to={`/topic/${e.id}`} className="title">{e.title}</Link>
                            <Moment fromNow className="time">{e.last_reply_at}</Moment>
                            </li>)
                       }
                       <li><Link to={`/user/${author.loginname}/topics`}>展示更多&gt;&gt;</Link></li>
                   </ul>
                    </div>
                    <div className="join">
                        <p>最近参与的话题</p>
                        <ul className="lists">
                       {
                           author.recent_replies.length===0?<div>无话题</div>:author.recent_replies.slice(0,5)
                            .map(e=><li key={e.id}><Link to={`/user/${e.author.loginname}`} className="avatar" onClick={()=>{
                                 getAuthor(e.author.loginname)
                            }}>
                        <img src={e.author.avatar_url} alt=""/></Link>
                        {/* <span className="number">
                         <span>{e.reply_count}</span>/{e.visit_count}</span> */}
                        <span className={`tab ${e.top?'active-tab':e.good?'active-tab':''}`}>{e.top?'置顶':e.good?'精华':e.tab==='share'?'分享':e.tab==='job'?'招聘':'问答'}</span>
                           <Link to={`/topic/${e.id}`} className="title">{e.title}</Link>
                            <Moment fromNow className="time">{e.last_reply_at}</Moment>
                            </li>)
                       }
                       <li><Link to={`/user/${author.loginname}/replies`}>展示更多&gt;&gt;</Link></li>
                   </ul>
                    </div>
                   </div>:<></>
               }
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    author:state.user
})

export default connect(mapStateToProps,{getAuthor})(UserInfo);