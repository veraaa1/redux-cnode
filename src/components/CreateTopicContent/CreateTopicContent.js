import React, { Component } from 'react';
import './createtopiccontent.scss'
import { Link } from 'react-router-dom';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import draftToMarkdown from 'draftjs-to-markdown';
// import { draftToMarkdown } from 'markdown-draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux'
import { createTopic,getTopics,updateTopic} from '../../actions';

class CreateTopicContent extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        titleValue:'',
        tabValue:'choose',
        topicId:'',
        isUpdate:false
      }
      onEditorStateChange=(editorState) => {
        this.setState({
          editorState,
        });
      };
      
      componentDidMount() {
          const{postid}=this.props.match.params
          console.log(postid);
          const{getTopics,topic}=this.props
          if(postid || this.state.postid){
            getTopics(postid)
            const contentBlock = htmlToDraft(topic?topic.content:'');
            if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            var editorState = EditorState.createWithContent(contentState);
            }
            this.setState({
                titleValue:topic?topic.title:'',
                postid:topic?topic.id:'',
                tabValue:topic?topic.tab:'choose',
                editorState:editorState,
                isUpdate:true
            })
          }
      }
      
    render() {
        const { editorState,titleValue,tabValue,isUpdate,postid} = this.state;
        const{topic,updateTopic}=this.props
        console.log(convertToRaw(editorState.getCurrentContent()));
        console.log(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        
        
        return (
            <div className="new-topic">
                <p className="title-to"><Link to="/">主页</Link>/发布话题</p>
                <div className="choose-tab"><span>选择板块:</span><select name="" id="tab" value={tabValue} onChange={this.handleSelectChange}>
                    <option value="choose">请选择</option>
                    <option value="share">分享</option>
                    <option value="ask">问答</option>
                    <option value="job">招聘</option>
                    <option value="dev">客户端测试</option>
                </select></div>
                <div className="title-con">
                <input type="text" placeholder="标题字数10字以上" id="title-input" value={titleValue} onChange={this.handleChange}/>
                </div>
                <div>
                    <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor "
                    onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <Link onClick={()=>{
                    if(isUpdate){
                        updateTopic(postid,titleValue,tabValue,draftToMarkdown((convertToRaw(editorState.getCurrentContent()))))
                    }else{
                        this.createTopics(titleValue,tabValue,draftToMarkdown((convertToRaw(editorState.getCurrentContent()))))
                    }
                    
                }} to={`/topic/${topic?topic.id:''}`}>提交</Link>
            </div>
        );
    }
    handleChange=(event)=>{
        this.setState({
            titleValue:event.target.value
        })
    }
    handleSelectChange=(event)=>{
        this.setState({
            tabValue:event.target.value
        })
    }
    createTopics=(title,tab,content)=>{
        const{createTopic}=this.props
        if(title.trim()&&tab!=='choose'&&content.trim()){
            createTopic(title,tab,content)
        }else{
            alert('不正当输入')
        }
       
    }
}
const mapStateToProps = (state) => ({
    topic : state.topic
})

export default connect(mapStateToProps,{createTopic,getTopics,updateTopic})(CreateTopicContent);