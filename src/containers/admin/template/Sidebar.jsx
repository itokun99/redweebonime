import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component {
    state = {

    }
    handleDropdownNav = () => {
        let nav = document.querySelectorAll('.panel-sidebar-nav li.has-submenu');
        nav.forEach((list) => {
            let toggle = list.childNodes[0]
            toggle.addEventListener('click', (self) => {
                if(toggle.classList.value === "active"){
                    toggle.classList.remove('active');
                    list.classList.remove('active');
                } else {
                    toggle.classList.add('active');
                    list.classList.add('active');
                }
            })
        })
    }

    componentDidMount(){
        this.handleDropdownNav();
    }
    render(){
        return(
            <div className="panel-sidebar">
                <div className="panel-sidebar-top">
                    
                </div>
                <div className="panel-sidebar-body">
                    <ul className="panel-sidebar-nav dropdown">
                        <li><Link to="/admin">Dashboard</Link></li>
                        <li className="has-submenu"><Link to="#">Anime</Link>
                            <ul>
                                <li><Link to="/admin/anime">Anime list</Link></li>
                                <li><Link to="/admin/anime/add">Add Anime</Link></li>
                            </ul>
                        </li>
                        <li><Link to="#">Manga</Link></li>
                        <li><Link to="#">Member</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;