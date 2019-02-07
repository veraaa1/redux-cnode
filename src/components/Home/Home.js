import React, { Component } from 'react';
import SecondNav from '../SecondNav/SecondNav'
import Lists from '../Lists/Lists'
import { connect } from 'react-redux'
import {getLists} from '../../actions'
class Home extends Component {
    state={
        type:'all'
    }
    render() {
        const {type}=this.state
        const {lists}=this.props
        return (
            <div>
               <SecondNav changeType={this.changeType}/>
               <Lists type={type} lists={lists}/> 
            </div>
        );
    }
    changeType=(type)=>{
        const {getLists}=this.props
        this.setState({
            type:type
        })
        getLists(1,type)
    }
}
const mapStateToProps = (state, ownProps) => ({
    lists:state.listReducer
})

export default connect(mapStateToProps,{getLists})(Home);