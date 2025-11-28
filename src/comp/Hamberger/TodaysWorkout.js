import React, { useEffect, useState } from 'react';
import { roundOff, formatData } from '../HelpFunctions';
import Table from './Table';

export default function TodaysWorkout(props) {
    const [isOpen, setIsOpen] = useState(true);
    const data = props.data;

    const onClose = () => {
        props.hamburgerMenuClose(false);
        setIsOpen(false);
    }

    return (
        <div className='workout-details-today'>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className='modal-title'>Today's Workout</div>
                        <div className='modal-close-icon' onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div>
                            <Table data={data} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}