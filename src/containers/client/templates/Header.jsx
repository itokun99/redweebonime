import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render(){
        return(
            <header className="header">
                <div className="header-container">
                    <div className="header-row">
                        <div className="header-left">
                            <div className="header-brand">
                                <h1 className="header-brand-title">
                                    <Link to="/">Site Name</Link>
                                </h1>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="header-nav">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/">Menu 1</Link></li>
                                    <li><Link to="/">Menu 2</Link></li>
                                    <li><Link to="/">Menu 3</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;