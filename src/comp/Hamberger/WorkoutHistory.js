import React, { useEffect, useState } from 'react';
import { getLongDate, roundOff, formatData } from '../HelpFunctions';
import Table from './Table';
import Summary from '../Summary/Summary';

export default function WorkoutHistory(props) {
    const { data, cumulativeTotalStars, cumulativeTotalCalories } = props;

    const [isOpen, setIsOpen] = useState(true);

    const onClose = () => {
        props.hamburgerMenuClose(false);
        setIsOpen(false);
    }

    return (
        <div className='workout-details-history'>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className='modal-title'>Workout History</div>
                        <div className='modal-close-icon' onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        < Summary totalCalories={cumulativeTotalCalories} totalStars={cumulativeTotalStars} />
                        <div className='workout-details-wrapper'>
                            {data.length === 0 &&
                                <div className='no-data-available'>No Data Available</div>
                            }
                            {data.map((item, idx) => (
                                <div className='workout-details-container' key={idx}>
                                    <div className='item date'>
                                        {item[0]}
                                    </div>
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