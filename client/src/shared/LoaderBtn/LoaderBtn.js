import React from 'react';
import DotsLoader from '../Loader/DotsLoader';
import './LoaderBtn.css';

const LoaderBtn = () => {
    return (
        <div className='estimating-btn-container'>
            <input className='estimating-btn' type="submit" value="ESTIMATING" disabled />
            <DotsLoader />
        </div>
    )
}

export default LoaderBtn;