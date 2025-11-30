import React from 'react';
import "./Summary.css";

function Summary(props) {
    return (
        <div className='workout-details-summary-wrapper'>
            <div className='workout-details-summary-container'>
                <div className='workout-details-summary-number'>{props.totalCalories}</div>
                <div className='workout-details-summary-label'>Calories</div>
            </div>
            <div className='workout-details-summary-container'>
                <div className='workout-details-summary-number'>{props.totalStars}</div>
                <div className='workout-details-summary-label'>Stars</div>
            </div>
        </div>
    );
}

export default Summary;