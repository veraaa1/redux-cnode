import React, { Component } from 'react';
import './createtopic.scss'
import { Link } from 'react-router-dom';
class CreateTopic extends Component {
    render() {
        return (
            <> 
                 {sessionStorage.name?<div className="create-topic">
                   <Link to="/create">发布话题</Link>
                </div>:<></>}
            
            </>
            
        );
    }
}

export default CreateTopic;