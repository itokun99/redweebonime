import React from 'react';

const Alert = (props) => {
    let type = props.type
    let message = props.message
    return(
        <div className={`alert alert-${type}`} style={props.style}>
            <span className='alert-message'>{message}</span>
        </div>
    )
}

export default Alert;