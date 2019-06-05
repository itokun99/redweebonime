import React, {Component} from 'react';

const ContentWrapper = (MainPanel) => {
    return(
        class MainWrapper extends Component {
            render(){
                return(
                    <div className="panel-mainpanel">
                        <MainPanel {...this.props} />
                    </div>
                )
            }
        }
    )
}


export default ContentWrapper;