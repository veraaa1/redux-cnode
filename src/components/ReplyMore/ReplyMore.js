import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAuthor } from '../../actions';
import './replymore.scss'
import Moment from 'react-moment';
import { Pagination } from "antd";
class ReplyMore extends Component {
    state={
        current:1,
        topicsCurrent:1
    }
    componentDidMount() {
        const{user,tab}=this.props.match.params
        const{getAuthor}=this.props
        if(user)
        getAuthor(user)
    }
    
    render() {
        const {user,tab}=this.props.match.params
        const {author}=this.props
        const {current,topicsCurrent}=this.state
        console.log(author);
        
        return (
            <div>
                <p className="user-title"><Link to="/">主页/</Link><Link to={`/user/${user}`}>{user}的主页</Link></p>
                {tab==='replies'?<div>
                {author?<ul className="lists">
                       {
                           author.recent_replies.slice((current-1)*5,current*5)
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
                      
                   </ul>:<></>
                }
                <Pagination current={current} onChange={this.onHandleChange} total={author?author.recent_replies.length:0} pageSize={5}/>
                </div>:<div>
                {author?<ul className="lists">
                       {
                           author.recent_topics.slice((topicsCurrent-1)*5,topicsCurrent*5)
.map(e=><li key={e.id}><Link to={`/user/${e.author.loginname}`} className="avatar">
                        <img src={e.author.avatar_url} alt=""/></Link>
                        {/* <span className="number">
                         <span>{e.reply_count}</span>/{e.visit_count}</span> */}
                        <span className={`tab ${e.top?'active-tab':e.good?'active-tab':''}`}>{e.top?'置顶':e.good?'精华':e.tab==='share'?'分享':e.tab==='job'?'招聘':'问答'}</span>
                           <Link to={`/topic/${e.id}`} className="title">{e.title}</Link>
                            <Moment fromNow className="time">{e.last_reply_at}</Moment>
                            </li>)
                       }
                       
                   </ul>:<></>}
                   <Pagination current={topicsCurrent} onChange={this.onHandleTopicsChange} total={author?author.recent_topics.length:0} pageSize={5}/>
                </div>}
            </div>
        );
    }
    onHandleChange=(page)=>{
        this.setState({
            current:page
        })
    }
    onHandleTopicsChange=(page)=>{
        this.setState({
            topicsCurrent:page
        })
    }
}
const mapStateToProps = (state, ownProps) => ({
    author:state.user
})

export default connect(mapStateToProps,{getAuthor})(ReplyMore);