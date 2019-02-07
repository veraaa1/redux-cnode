import React, { Component } from 'react'
import Header from '../Header/Header'
import Layout from '../Layout/Layout'
import CurrentUserInfo from '../CurrentUserInfo/CurrentUserInfo'
import { Route,Switch } from 'react-router-dom';
import TopicDetail from '../TopicDetail/TopicDetail'
import { connect } from 'react-redux'
import { getLists } from '../../actions/index';
import Home from '../Home/Home'
import UserInfo from '../UserInfo/UserInfo';
import CreateTopic from '../CreateTopic/CreateTopic';
import CreateTopicContent from '../CreateTopicContent/CreateTopicContent';
import Msg from '../Msg/Msg';
import Activity from '../Activity/Activity';
import ReplyMore from '../ReplyMore/ReplyMore';
import TopicsMore from '../TopicsMore/TopicsMore';
export default class Cnode extends Component {
   
    render() {
        return (
            <div>
                <Header/>
                <Layout className="cnode-main">
                    <div className="left">
                        <Switch>
                        <Route component={Msg} path="/my/messages"></Route>
                        <Route component={TopicDetail} path="/topic/:topicid"></Route>
                        <Route component={ReplyMore} path="/user/:user/:tab"></Route>
                        <Route component={UserInfo} path="/user/:user"/>
                        <Route component={CreateTopicContent} path="/update/:postid"></Route>
                        <Route component={CreateTopicContent} path="/create"></Route>
                        <Route component={Home} path="/:type"></Route>
                        <Route component={Home} path="/"></Route>
                        </Switch>
                    </div>
                    <div className="right">
                        <Switch>
                        <Route component={CurrentUserInfo} path="/topic/:topicid"></Route>
                        <Route component={CurrentUserInfo} path="/user/:user"/>
                        <Route component={CurrentUserInfo} path="/"></Route>
                        </Switch>
                        <Route component={Activity} path="/"></Route>
                    </div>
                </Layout>
            </div>
        )
    }
}
// const mapStateToProps = (state) => ({
//     lists :state.listReducer
// })

// export default connect(mapStateToProps,{getLists})(Cnode)
