import React, { Component } from 'react';
import './msg.scss'
import { connect } from 'react-redux'
import {getMsg} from '../../actions'
import { Link } from 'react-router-dom';
class Msg extends Component {
    
    componentDidMount() {
        const{getMsg}=this.props
        getMsg()
    }
    render() {
        const{ msg} = this.props
        return (
            <div>
              {
                  msg?<>
                    <div className="new-msg">
                        <p><Link to="/">主页/</Link>新消息</p>
                        <div>

                        </div>
                    </div>
                  </>:<></>
              } 
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    msg:state.msg
})

export default connect(mapStateToProps,{getMsg})(Msg);