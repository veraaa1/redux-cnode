import React, { Component } from 'react';
import './layout.scss'
class Layout extends Component {
    render() {
        const {className,children}=this.props
        console.log(this.props);
        
        return (
            <div className={`layout ${className}`}>
                <div className="layout-inner">
                    {children}
                </div>
            </div>
        );
    }
}

export default Layout;
Layout.defaultProps={
    className :''
}