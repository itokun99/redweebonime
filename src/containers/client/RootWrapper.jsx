import React, {Component} from 'react';
import Header from './templates/Header';
import Footer from './templates/Footer';

// Template dan Main Content untuk klien di wrapping menggunakan komponen ini
const RootWrapper = (SiteMain) => {
    return(
        class SiteWrapper extends Component {
            render(){
                return(
                    <>
                        <Header {...this.props} />
                        <SiteMain {...this.props} />
                        <Footer {...this.props} />
                    </>
                )
            }
        }
    )
}

export default RootWrapper;