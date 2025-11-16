import React, { useEffect, useState } from 'react';
import { getLongDate, roundOff, formatData } from './HelpFunctions';

export default function WorkoutHistory(props) {
    const { data, cumulativeTotalStars, cumulativeTotalCalories } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const tempFormattedData = formatData(data);
            tempFormattedData.forEach((item, idx) => {
                item[0] = getLongDate(new Date(item[0]));
            });
            setFormattedData(tempFormattedData);
        }
    }, [isOpen, data]);

    return (
        <div className='workout-details-history'>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(true); }}>
                Workout History
            </a>
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className='modal-title'>Workout History</div>
                        <div className='modal-close-icon' onClick={() => setIsOpen(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='workout-details-summary-wrapper'>
                            <div className='workout-details-summary-container'>
                                <div className='workout-details-summary-number'>{cumulativeTotalCalories}</div>
                                <div className='workout-details-summary-label'>Calories</div>
                            </div>
                            <div className='workout-details-summary-container'>
                                <div className='workout-details-summary-number'>{cumulativeTotalStars}</div>
                                <div className='workout-details-summary-label'>Stars</div>
                            </div>
                        </div>
                        <div className='workout-details-wrapper'>
                            {formattedData.length === 0 &&
                                <div className='no-data-available'>No Data Available</div>
                            }
                            {formattedData.reverse().map((item, idx) => (
                                <div className='workout-details-container' key={idx}>
                                    <div className='item date'>
                                        Date: {item[0]}
                                    </div>
                                    <div className='item'>
                                        Crunches: {item[1]} ({roundOff(item[8])} Cals)
                                    </div>
                                    <div className='item'>
                                        Walk: {item[2]} miles ({roundOff(item[9])} Cals)
                                    </div>
                                    <div className='item'>
                                        Just Fit: {item[3]} mins ({roundOff(item[10])} Cals)
                                    </div>
                                    <div className='item'>
                                        Vibration Plate: {item[4]} mins ({roundOff(item[11])} Cals)
                                    </div>
                                    <div className='item'>
                                        Planks: {item[5]} secs ({roundOff(item[12])} Cals)
                                    </div>
                                    <div className='item'>
                                        Bike: {item[6]} mins ({roundOff(item[13])} Cals)
                                    </div>
                                    <div className='item'>
                                        Row: {item[7]} mins ({roundOff(item[14])} Cals)
                                    </div>
                                    <div className='item total'>
                                        Total calories: {roundOff(item[15])} Cals ({roundOff(item[15] / 100)} stars)
                                    </div>
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