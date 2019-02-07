import React from 'react'
import { connect } from 'react-redux'
import Cnode from '../components/Cnode/Cnode'
import { getLists } from '../actions/index';
const Container = (props)=><Cnode {...props}/>
const mapStateToProps = (state) => ({
    lists :state.listReducer
})

export default connect(mapStateToProps,{getLists})(Container)