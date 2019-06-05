import React, {Component} from 'react';
import Header from './template/Header';
import Footer from './template/Footer';
import Sidebar from './template/Sidebar';

const AdminWrapper = (AdminRouterContent) => {
    return(
        class AdminRouterWrapper extends Component {
            render(){
                return(
                    <>
                        <Sidebar {...this.props} />
                        <Header {...this.props} />
                        <div className="panel-section panel-dashboard">
                            <AdminRouterContent {...this.props} />                    
                        </div>
                        <Footer {...this.props} />
                    </>
                )
            }
        }
    )
}

export default AdminWrapper;