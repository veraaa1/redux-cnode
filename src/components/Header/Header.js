import React, { Component } from 'react';
import './header.scss'
import { Link,NavLink} from 'react-router-dom';
import { getNotReadNum } from '../../selectors/index';
class Header extends Component {
    render() {
        return (
            <header>
                <div className="header-inner">
                <Link to="/">
                    <h1>
                        <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt=""/>
                    </h1>
                </Link>
                <div className="search">
                    <input type="text"/>
                </div>
                <ul>
                    <li><NavLink to="/">首页</NavLink></li>
                    <li><NavLink to="/my/messages">未读消息<span>{sessionStorage.token? getNotReadNum():''}</span></NavLink></li>
                    <li><NavLink to="/getstart">新手入门</NavLink></li>
                    <li><NavLink to="/api">API</NavLink></li>
                    <li><NavLink to="/about">关于</NavLink></li>
                    <li><NavLink to="/setting">设置</NavLink></li>
                    <li><NavLink to="/">退出</NavLink></li>
                </ul>
                </div>
                
            </header>
        );
    }
}

export default Header;