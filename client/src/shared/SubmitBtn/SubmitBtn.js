import React from 'react';
import './SubmitBtn.css';

const SubmitBtn = ({ disabledBtn }) => {
    return (
        <div className={disabledBtn ? "d-estimate-btn-container" : "estimate-btn-container"}>
            <input className={disabledBtn ? "d-estimate-btn" : "estimate-btn"} type="submit" value="ESTIMATE" disabled={disabledBtn} />
        </div>
    )
}

export default SubmitBtn