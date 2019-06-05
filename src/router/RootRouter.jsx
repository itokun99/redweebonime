import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'; 


/* Root Router : berfungsi sebagai plugged component / HOC yang mewrapping parameter komponennya
agar tidak perlu nulis ulang kode */

const RootRouter = (ChildRouter) => {
    return(
        class ParentRouter extends Component {
            render(){
                return(
                    // set browser router
                    <BrowserRouter>
                        <ChildRouter {...this.props} />
                    </BrowserRouter>
                )
            }
        }
    )
}

export default RootRouter;