import React, {Component} from 'react';
import {GlobalConsumer} from '../../../context/context';

class Header extends Component {
    state = {

    }
    
    //method buat logout dari admin panel
    handleLogout = () => {
        let action = {
            type : "ADMIN_LOGOUT"
        }
        localStorage.removeItem("__user");

        this.props.RootAction(action);
        if(typeof(this.props.push) === 'function'){
            this.props.push('/admin')
        }
    }
    render(){
        // console.log(this);
        return(
            <header className="panel-header">
                <div className="panel-header-row">
                    <div className="panel-header-left">
                        <div className="panel-header-brand">
                            <h1 className="panel-header-brand-title">Admin Panel</h1>
                        </div>
                    </div>
                    <div className="panel-header-right">
                        <div className="panel-header-nav">
                            <span onClick={this.handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default GlobalConsumer(Header);