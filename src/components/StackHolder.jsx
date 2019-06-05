import React, {Component} from 'react';

class StackHolder extends Component {
    render(){
        return(
            <div className="stackholder">
                <div className="stackholder-header">
                    <div className="stackholder-header-left">
                        <span className="stackholder-header-title">Stack Holder Title</span>
                    </div>
                    <div className="stackholder-header-right">
                        <span className="stackholder-show-more btn btn-info">Show More</span>
                    </div>
                </div>
                <div className="stackholder-body">

                </div>
                <div className="stackholder-footer">

                </div>
            </div>
        );
    }
}

export default StackHolder;