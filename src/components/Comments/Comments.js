import React, { Component } from 'react';
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import { Link } from 'react-router-dom';
import './comments.scss'
import { connect } from 'react-redux'
import { ups,addComment,replyComment,getAuthor} from '../../actions';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import draftToMarkdown from 'draftjs-to-markdown';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
class Comments extends Component {
    state = {
        editorState:EditorState.createEmpty(),
        isOpen:false,
        replyId:'',
        replyEditorState:EditorState.createEmpty(),
    }
    onEditorStateChange=(editorState) => {
        this.setState({
          editorState,
        });
      };
    
    render() {
        const {content,ups,topic,replyComment,getAuthor}= this.props
        const {replyId,replyEditorState,editorState,isOpen} = this.state
        console.log(draftToMarkdown((convertToRaw(replyEditorState.getCurrentContent()))));
        
        return (
            <div className="comments-all">
                <p>{content.length?content.length:0}回复</p>
            {
                content.length?<ul className="comments">
                    {
                        content.map((e,ind)=><li key={e.id} style={{backgroundColor:replyId===e.id && isOpen?'#f6f6f6':'#fff'}}>
                        <Link to={`/user/${e.author.loginname}`} className="avatar" onClick={()=>{
                            getAuthor(e.author.loginname)
                        }}>
                            <img src={e.author.avatar_url} alt=""/>
                        </Link>
                        <div className="comment-content">
                            <div className="userinfo">
                                <span className="username">{e.author.loginname}</span>
                                <span className="blue">.&nbsp;&nbsp;{ind+1}楼</span>
                                <span className="blue">.&nbsp;&nbsp;<Moment fromNow locale="zh-cn">{e.create_at}</Moment></span>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: e.content}} className="con"></div>
                            <div className="reply-all" style={{display:replyId===e.id && isOpen?'block':'none'}}>
                                {/* <textarea name="" id="reply" cols="30" rows="10" value={`${replyVal}`} onChange={this.handleReply}></textarea> */}
                                <Editor
                                    editorState={replyEditorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor "
                                    id="reply"
                                    onEditorStateChange={this.handleReply}
                                    />
                                <button onClick={()=>{
                                    replyComment(topic.id,draftToMarkdown((convertToRaw(replyEditorState.getCurrentContent()))),e.id,this.finishReplyp)
                                }}>提交</button>
                            </div>
                        </div>
                        
                        {e.ups.length&&sessionStorage.token?<span className="ups"><a href="javascript:;" onClick={()=>{
                            ups(e.id,topic.id)
                        }}><svg className="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><defs><style/></defs><path d="M219.286 786.286c0-20-16.57-36.571-36.57-36.571s-36.572 16.571-36.572 36.571 16.571 36.571 36.571 36.571 36.571-16.571 36.571-36.571zm658.285-329.143c0-38.857-34.857-73.143-73.143-73.143H603.285c0-66.857 54.857-115.429 54.857-182.857 0-66.857-13.143-109.714-91.429-109.714C530.143 128.572 549 216 493.57 274.286c-16 16.571-29.714 34.286-44 52-25.714 33.143-93.714 130.857-138.857 130.857h-18.286v365.714h18.286c32 0 84.571 20.571 115.43 31.429C488.998 876 554.142 896 621.57 896h69.143c64.571 0 109.714-25.714 109.714-95.429 0-10.857-1.143-21.714-2.857-32 24-13.143 37.143-45.714 37.143-72 0-13.714-3.429-27.429-10.286-39.429 19.43-18.286 30.286-41.143 30.286-68 0-18.286-8-45.143-20-58.857 26.857-.571 42.857-52 42.857-73.143zm73.143-.571c0 33.143-9.714 65.714-28 93.143 3.43 12.571 5.143 26.286 5.143 39.429 0 28.571-7.429 57.143-21.714 82.286 1.143 8 1.714 16.571 1.714 24.571 0 36.571-12 73.143-34.286 101.714 1.143 108-72.57 171.429-178.286 171.429h-73.714c-81.143 0-156.57-24-232-50.286-16.57-5.714-62.857-22.857-78.857-22.857h-164.57A72.92 72.92 0 0 1 73 822.858V457.144a72.92 72.92 0 0 1 73.143-73.143h156.571C325 369.144 363.857 317.715 381 295.43c19.43-25.143 39.43-49.714 61.143-73.143 34.286-36.571 16-126.857 73.143-182.857 13.714-13.143 32-21.143 51.43-21.143 59.428 0 116.57 21.143 144.57 76.571 17.714 34.857 20 68 20 106.286 0 40-10.286 74.286-27.429 109.714h100.571c78.857 0 146.286 66.857 146.286 145.714z" fill="#8a8a8a"/></svg></a>{e.ups.length}
                        
                        </span>:<div className="show-ups"><a href="javascript:;" onClick={()=>{
                            ups(e.id,topic.id)
                        }}><svg className="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><defs><style/></defs><path d="M219.286 786.286c0-20-16.57-36.571-36.57-36.571s-36.572 16.571-36.572 36.571 16.571 36.571 36.571 36.571 36.571-16.571 36.571-36.571zm658.285-329.143c0-38.857-34.857-73.143-73.143-73.143H603.285c0-66.857 54.857-115.429 54.857-182.857 0-66.857-13.143-109.714-91.429-109.714C530.143 128.572 549 216 493.57 274.286c-16 16.571-29.714 34.286-44 52-25.714 33.143-93.714 130.857-138.857 130.857h-18.286v365.714h18.286c32 0 84.571 20.571 115.43 31.429C488.998 876 554.142 896 621.57 896h69.143c64.571 0 109.714-25.714 109.714-95.429 0-10.857-1.143-21.714-2.857-32 24-13.143 37.143-45.714 37.143-72 0-13.714-3.429-27.429-10.286-39.429 19.43-18.286 30.286-41.143 30.286-68 0-18.286-8-45.143-20-58.857 26.857-.571 42.857-52 42.857-73.143zm73.143-.571c0 33.143-9.714 65.714-28 93.143 3.43 12.571 5.143 26.286 5.143 39.429 0 28.571-7.429 57.143-21.714 82.286 1.143 8 1.714 16.571 1.714 24.571 0 36.571-12 73.143-34.286 101.714 1.143 108-72.57 171.429-178.286 171.429h-73.714c-81.143 0-156.57-24-232-50.286-16.57-5.714-62.857-22.857-78.857-22.857h-164.57A72.92 72.92 0 0 1 73 822.858V457.144a72.92 72.92 0 0 1 73.143-73.143h156.571C325 369.144 363.857 317.715 381 295.43c19.43-25.143 39.43-49.714 61.143-73.143 34.286-36.571 16-126.857 73.143-182.857 13.714-13.143 32-21.143 51.43-21.143 59.428 0 116.57 21.143 144.57 76.571 17.714 34.857 20 68 20 106.286 0 40-10.286 74.286-27.429 109.714h100.571c78.857 0 146.286 66.857 146.286 145.714z" fill="#8a8a8a"/></svg></a>
                        </div>}
                        <a href="javascript:;" className="reply" onClick={()=>{this.changeReply(e.id,e.author.loginname)}}>
                        <svg className="icon" viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg" width="16.016" height="16"><defs><style/></defs><path d="M415.937 320V96L20.001 438.176c-26.72 23.104-26.624 60.608.032 83.648L415.937 864V640c224 0 432 48 608 288-80-448-416-608-608-608" fill="#707070"/></svg>
                        </a>
                        
                        </li>)
                    }
                </ul>:<></>
            }
         {sessionStorage.token?<div className="comment-add">
             <p>添加回复</p>
             {/* <textarea name="" id="comments" cols="30" rows="10" value={this.state.value} onChange={this.handleChange}></textarea> */}
             <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor "
                    id="comments"
                    onEditorStateChange={this.onEditorStateChange}
                    />
             <button onClick={this.addComments}>提交</button>
         </div>:<></>}
            </div>
        );
    }
    handleChange=(event)=>{
        this.setState({
            value:event.target.value
        })
    }
    handleReply=(replyEditorState)=>{
        this.setState({
            replyEditorState
        })
    }
    addComments=()=>{
        const{addComment,topic}=this.props
        const {editorState}=this.state
        addComment(topic.id,draftToMarkdown((convertToRaw(editorState.getCurrentContent()))),this.clear)
    }
    clear=()=>{
        this.setState({
            editorState:EditorState.createEmpty(),
        })
    }
    changeReply=(id,name)=>{
        const {isOpen}=this.state
        console.log(111);
        const contentBlock = htmlToDraft(`@${name}`);
            if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            var newEditorState = EditorState.createWithContent(contentState);
            console.log(draftToMarkdown((convertToRaw(newEditorState.getCurrentContent()))));
            
            }
        if(sessionStorage.name){
        this.setState({
            replyId:id,
            isOpen:!isOpen,
            replyEditorState:newEditorState
        })
        }else{
            alert('请先登录哦')
        }
        
    }
    finishReply=()=>{
        this.setState({
            isOpen:false
        })
    }
}
const mapStateToProps = (state, ownProps) => ({
    topic:state.topic
})

export default connect(mapStateToProps,{ups,addComment,replyComment,getAuthor})(Comments);