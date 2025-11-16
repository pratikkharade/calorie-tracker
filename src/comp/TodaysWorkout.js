import React, { useEffect, useState } from 'react';
import { roundOff, formatData } from './HelpFunctions';

export default function TodaysWorkout(props) {
    const [isOpen, setIsOpen] = useState(false);
    const data = props.data;

    const [crunches, setCrunches] = useState(0);
    const [crunchesCalories, setCrunchesCalories] = useState(0);
    const [walk, setWalk] = useState(0);
    const [walkCalories, setWalkCalories] = useState(0);
    const [justFit, setJustFit] = useState(0);
    const [justFitCalories, setJustFitCalories] = useState(0);
    const [vibrationPlate, setVibrationPlate] = useState(0);
    const [vibrationPlateCalories, setVibrationPlateCalories] = useState(0);
    const [planks, setPlanks] = useState(0);
    const [planksCalories, setPlanksCalories] = useState(0);
    const [bike, setBike] = useState('');
    const [bikeCalories, setBikeCalories] = useState(0);
    const [row, setRow] = useState('');
    const [rowCalories, setRowCalories] = useState(0);

    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        if (isOpen) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const formattedData = formatData(data);

            if (formattedData.length === 0) {
                return;
            }

            const todaysData = formattedData.reduce((idx, item) => {
                const date = new Date(item[0]);
                date.setHours(0, 0, 0, 0);
                if (today.getTime() === date.getTime()) {
                    return item;
                }
            });

            setCrunches(todaysData[1]);
            setWalk(todaysData[2]);
            setJustFit(todaysData[3]);
            setVibrationPlate(todaysData[4]);
            setPlanks(todaysData[5]);
            setBike(todaysData[6]);
            setRow(todaysData[7]);

            setCrunchesCalories(roundOff(todaysData[8]));
            setWalkCalories(roundOff(todaysData[9]));
            setJustFitCalories(roundOff(todaysData[10]));
            setVibrationPlateCalories(roundOff(todaysData[11]));
            setPlanksCalories(roundOff(todaysData[12]));
            setBikeCalories(roundOff(todaysData[13]));
            setRowCalories(roundOff(todaysData[14]));

            setTotalCalories(roundOff(todaysData[15]));
        }
    }, [isOpen, data]);

    return (
        <div className='workout-details-today'>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(true); }}>
                Today's Workout
            </a>

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className='modal-title'>Today's Workout</div>
                        <div className='modal-close-icon' onClick={() => setIsOpen(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div>
                            <div className='item'>
                                Crunches: {crunches} ({crunchesCalories} Cals)
                            </div>
                            <div className='item'>
                                Walk: {walk} miles ({walkCalories} Cals)
                            </div>
                            <div className='item'>
                                Just Fit: {justFit} mins ({justFitCalories} Cals)
                            </div>
                            <div className='item'>
                                Vibration Plate: {vibrationPlate} mins ({vibrationPlateCalories} Cals)
                            </div>
                            <div className='item'>
                                Planks: {planks} secs ({planksCalories} Cals)
                            </div>
                            <div className='item'>
                                Bike: {bike} mins ({bikeCalories} Cals)
                            </div>
                            <div className='item'>
                                Row: {row} mins ({rowCalories} Cals)
                            </div>
                            <div className='item total'>
                                Total calories: {totalCalories} Cals ({roundOff(totalCalories / 100)} stars)
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}