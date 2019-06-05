import React, {Component} from 'react';
import {GlobalConsumer} from '../../../context/context';
import ContentWrapper from '../templates/ContentWrapper';
class Homepage extends Component {
    state = {
        
    }
    render(){
        return(
            <div>Homepage</div>
        )
    }
}

export default GlobalConsumer(ContentWrapper(Homepage));