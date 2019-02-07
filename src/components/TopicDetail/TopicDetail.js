import React, { Component } from 'react';
import './topicdetail.scss'
import { getTopics ,isCollect} from '../../actions';
import { connect } from 'react-redux'
import Moment from 'react-moment';
import Comments from '../Comments/Comments'
import { Link } from 'react-router-dom';
class TopicDetail extends Component {
    componentDidMount() {
        console.log(this.props);
        
        const{getTopics}=this.props
        getTopics(this.props.match.params.topicid)
    }
    
    render() {
        const {topic,isCollect}=this.props
        console.log(topic?topic.is_collect:'');
        
        return (
            <div className="topic">
                {
                    topic?<div className="topic-all">
                            <div className="topic-head">
                            <div className="top">
                                <span className="tab">{topic.top?'置顶':topic.good?'精华':topic.tab==='share'?'分享':topic.tab==='job'?'招聘':'问答'}</span>
                                <h2>{topic.title}</h2>
                            </div>
                                <p>发布于:<Moment fromNow>{topic.create_at}</Moment> 作者:{topic.author.loginname}  {topic.visit_count} 次浏览  来自:{topic.tab==='share'?'分享':topic.tab==='job'?'招聘':'问答'}</p>
                                <div className="button-div">
                                {sessionStorage.name?<button onClick={()=>{
                                     isCollect(topic.is_collect,topic.id)
                                }} className="collect">{topic.is_collect?'取消收藏':'收藏'}</button>:<></>}
                                {
                                    topic.author.loginname===sessionStorage.name?<div><Link to={`/update/${topic.id}`} className="edit">编辑</Link><button className="delete">删除</button></div>:<></>
                                }
                                </div>
                            </div>
                            <div className="detail" dangerouslySetInnerHTML={{ __html: topic.content }}>
                            
                            </div>
                            
                    </div>:<div>waiting...</div>
                }
                <Comments content={topic?topic.replies:[]}/>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    topic:state.topic
})

export default connect(mapStateToProps,{getTopics,isCollect})(TopicDetail);