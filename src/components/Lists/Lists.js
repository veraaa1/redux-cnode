import React, { Component } from 'react';
import './list.scss'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { getLists,getTopics} from '../../actions';
class Lists extends Component {
    state={
        current:1,
    }
    componentDidMount() {
        const {getLists,type}=this.props
        const {current}=this.state
        getLists(current,type)
    }
    
    render() {
        const {lists,type,getTopics}=this.props
        console.log(type);
        
        return (
            <div className="topic-list">
               {
                   lists.length?
                   <div>
                   <ul className="lists">
                       {
                           lists.map(e=><li key={e.id}><Link to={`/user/${e.author.loginname}`} className="avatar">
                           <img src={e.author.avatar_url} alt=""/></Link>
                           <span className="number">
                           <span>{e.reply_count}</span>/{e.visit_count}</span>
                           <span className={`tab ${e.top?'active-tab':e.good?'active-tab':''}`}>{e.top?'置顶':e.good?'精华':e.tab==='share'?'分享':e.tab==='job'?'招聘':'问答'}</span>
                           <Link to={`/topic/${e.id}`} className="title" onClick={()=>{
                               getTopics(e.id)
                           }}>{e.title}</Link>
                           <Moment fromNow className="time">{e.last_reply_at}</Moment>
                           </li>)
                       }
                   </ul>  
                   <Pagination current={this.state.current} onChange={this.onChange} total={type==='all'?3256:type==='good'?676:type==='share'?1346:type==='ask'?1912:475} pageSize={40}/>
                   </div>:<div>waiting...</div> 
               }
            </div>
        );
    }
    onChange=(page)=>{
        const {getLists,type}=this.props
        getLists(this.state.current+1,type?type:'all')
        this.setState({
            current:page
        })
        
    }
}
const mapStateToProps = (state) => ({
    lists:state.listReducer
})

export default connect(mapStateToProps,{getLists,getTopics})(Lists);