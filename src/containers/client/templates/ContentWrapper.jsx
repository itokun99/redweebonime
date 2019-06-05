import React, {Component} from 'react';

const ContentWrapper = (ContentMain) => {
    return(
        class ContentWrap extends Component {
            render(){
                return(
                    <section className="contentwrapper">
                        <div className="contentwrapper-container">
                            <div className="contentwrapper-row">
                                <div className="contentwrapper-col-full">
                                    <ContentMain {...this.props} />
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        }
    );
}

export default ContentWrapper;