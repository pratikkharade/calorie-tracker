import React, { useState } from 'react';
import Table from './Table';
import Summary from '../Summary/Summary';
import Calendar from '../Calendar/Calendar';
import "./WorkoutHistory.css";

export default function WorkoutHistory(props) {
    const { data, totalStars, totalCalories } = props;
    
    const [isOpen, setIsOpen] = useState(false);
    const [dataForSelectedDate, setDataForSelectedDate] = useState([]);

    const onClose = () => {
        setIsOpen(false);
    }

    const getSelectedDate = (date) => {
        const selectedData = data.filter(item => item[0] === date);
        setDataForSelectedDate(selectedData);
    }

    return (
        <div className='workout-details-history'>
            <div onClick={() => setIsOpen(true)}>
                <i className="fa-solid fa-clock-rotate-left" style={{ "fontSize": "1.25rem" }}></i>
            </div>
            {isOpen && data && data.length && (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className='modal-title'>Workout History</div>
                        <div className='modal-close-icon' onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <Summary totalCalories={totalCalories} totalStars={totalStars} />
                        <Calendar enabledDates={data.map(item => item[0])} getSelectedDate={getSelectedDate} />
                        <div className='workout-details-wrapper'>
                            {dataForSelectedDate.length === 0 &&
                                <div className='no-data-available'>
                                    <div>No Data Available</div>
                                    <div>(Please select a different date)</div>
                                </div>
                            }
                            {dataForSelectedDate
                                .map((item, idx) => (
                                    <div className='workout-details-container' key={idx}>
                                        <Table data={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}