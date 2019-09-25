import React from 'react';
import './spinner.scss';


const Spinner = (WrappedComponent) => ({isLoading, ...otherProps}) => {
    return isLoading ? (
        <div className="spinner-overlay">
            <div className= "spinner-container"/>
        </div>
    ) : (
        <WrappedComponent {...otherProps}/>
    )
}

export default Spinner;