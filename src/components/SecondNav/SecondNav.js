import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './secondnav.scss'
class SecondNav extends Component {

    render() {
        const {changeType}=this.props
        return (
            <nav>
              <ul>
                  <li><NavLink to="/" exact  onClick={()=>{
                      changeType('all')
                  }}>全部</NavLink></li>
                  <li><NavLink to="/good" onClick={()=>{
                      changeType('good')
                  }}>精华</NavLink></li>
                  <li><NavLink to="/share" onClick={()=>{
                      changeType('share')
                  }}>分享</NavLink></li>
                  <li><NavLink to="/ask" onClick={()=>{
                      changeType('ask')
                  }}>问答</NavLink></li>
                  <li><NavLink to="/job" onClick={()=>{
                      changeType('job')
                  }}>招聘</NavLink></li>
              </ul>  
            </nav>
        );
    }

}

export default SecondNav;