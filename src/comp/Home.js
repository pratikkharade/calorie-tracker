import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css.css";

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwb5ycYk_cyBzKDu3Z3ob6vbbp37xC8Qzx4J_jNxoyQdYSrYVBEI44w6NIFFl1_EAqEVw/exec';

export default function App() {
    const [data, setData] = useState([]);
    // const [name, setName] = useState('');
    // const [value, setValue] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('');
    

    const [crunches, setCrunches] = useState('');
    const [crunchesCalories, setCrunchesCalories] = useState(0);
    const [walk, setWalk] = useState('');
    const [walkCalories, setWalkCalories] = useState(0);
    const [justFit, setJustFit] = useState('');
    const [justFitCalories, setJustFitCalories] = useState(0);
    const [vibrationPlate, setVibrationPlate] = useState('');
    const [vibrationPlateCalories, setVibrationPlateCalories] = useState(0);
    const [planks, setPlanks] = useState('');
    const [planksCalories, setPlanksCalories] = useState(0);

    const [totalCalories, setTotalCalories] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [cumulativeTotalCalories, setCumulativeTotalCalories] = useState(0);
    const [cumulativeTotalStars, setCumulativeStars] = useState(0);

    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    const fetchData = async () => {
        try {
            setLoadingMsg('Loading...');
            setIsLoading(true);
            
            const res = await axios.get(SHEET_URL);

            setCumulativeTotalCalories(Math.round(res.data[0][1] * 100) / 100);
            setCumulativeStars(Math.round(res.data[1][1] * 100) / 100);
            setData(res.data.slice(3,));
            setIsLoading(false)
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setLoadingMsg('');
        }
    };

    const submitData = async () => {
        const params = `writeData=${true}&` +
            `todayDate=${formattedDate}&` +
            `crunches=${crunches || 0}&` +
            `crunchesCalories=${crunchesCalories || 0}&` +
            `walk=${walk || 0}&` +
            `walkCalories=${walkCalories || 0}&` +
            `justFit=${justFit || 0}&` +
            `justFitCalories=${justFitCalories || 0}&` +
            `vibrationPlate=${vibrationPlate || 0}&` +
            `vibrationPlateCalories=${vibrationPlateCalories || 0}&` +
            `planks=${planks || 0}&` +
            `planksCalories=${planksCalories || 0}&` +
            `totalCalories=${totalCalories || 0}`;
        
        try {
            setLoadingMsg('Saving your data!!!');
            setIsLoading(true);
            await axios.get(`${SHEET_URL}?${params}`);
            setCrunches('');
            setWalk('');
            setJustFit('');
            setVibrationPlate('');
            setPlanks('');
            fetchData();
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setLoadingMsg('');
        }
    };

    // CRUNCHES
    const crunchesChange = (e) => {
        setCrunches(e.target.value);
    }
    useEffect(() => {
        setCrunchesCalories(crunches / 10);
    }, [crunches]);

    // WALK
    const walkChange = (e) => {
        setWalk(e.target.value);
    }
    useEffect(() => {
        setWalkCalories(walk * 100);
    }, [walk]);

    // JUST FIT
    const justFitChange = (e) => {
        setJustFit(e.target.value);
    }
    useEffect(() => {
        setJustFitCalories(justFit * 2);
    }, [justFit]);

    // VIBRATION PLATE
    const vibrationPlateChange = (e) => {
        setVibrationPlate(e.target.value);
    }
    useEffect(() => {
        setVibrationPlateCalories(vibrationPlate * 5);
    }, [vibrationPlate]);

    // JUST FIT
    const planksChange = (e) => {
        setPlanks(e.target.value);
    }
    useEffect(() => {
        setPlanksCalories(planks * 10);
    }, [planks]);


    useEffect(() => {
        const total = crunchesCalories + walkCalories + justFitCalories;
        setTotalCalories(total);
    }, [crunchesCalories, walkCalories, justFitCalories]);

    useEffect(() => {
        setTotalStars(totalCalories / 100);
    }, [totalCalories]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {isLoading && 
                <div className='loading-wrapper'>{loadingMsg}</div>
            }
            <div className='app-title'>
                Maggi's Calorie Tracker
            </div>

            <div className='lifetime-details'>
                <div className='lifetime-stars'>
                    Lifetime Stars Earned: {cumulativeTotalStars}
                </div>
                <div className='lifetime-calories'>
                    Lifetime Calorie Burn: {cumulativeTotalCalories}
                </div>
            </div>

            {/* <div className='lifetime-details'>
                <div className='lifetime-stars'>
                    <div className='lifetime-stars-num'>
                        {cumulativeTotalStars}
                    </div>
                    <div className='lifetime-stars-label'>
                        Lifetime Stars Earned
                    </div>
                </div>
                <div className='lifetime-calories'>
                    <div className='lifetime-calories-num'>
                        {cumulativeTotalCalories}
                    </div>
                    <div className='lifetime-calories-label'>
                        Lifetime Calorie Burn
                    </div>
                </div>
            </div> */}

            <div className="today-date">
                Today's date: {formattedDate}
            </div>

            <div className='wrapper'>
                <div className='title'>Crunches</div>
                <div className='input'>
                    <input value={crunches} onChange={crunchesChange}></input> nos.
                </div>
                <div className='calories'>
                    {crunchesCalories} calories (0.1 calorie/crunch)
                </div>
            </div>

            <div className='wrapper'>
                <div className='title'>Walk</div>
                <div className='input'>
                    <input value={walk} onChange={walkChange}></input> miles
                </div>
                <div className='calories'>
                    {walkCalories} calories (100 calories/mile)
                </div>
            </div>

            <div className='wrapper'>
                <div className='title'>Just Fit</div>
                <div className='input'>
                    <input value={justFit} onChange={justFitChange}></input> mins
                </div>
                <div className='calories'>
                    {justFitCalories} calories (2 calories/min)
                </div>
            </div>

            <div className='wrapper'>
                <div className='title'>Vibration Plate</div>
                <div className='input'>
                    <input value={vibrationPlate} onChange={vibrationPlateChange}></input> mins
                </div>
                <div className='calories'>
                    {vibrationPlateCalories} calories (5 calories/min)
                </div>
            </div>

            <div className='wrapper'>
                <div className='title'>Planks</div>
                <div className='input'>
                    <input value={planks} onChange={planksChange}></input> mins
                </div>
                <div className='calories'>
                    {planksCalories} calories (10 calories/min)
                </div>
            </div>

            <div className='today-details'>
                <div className='today-calories-details'>
                    Today's Total Calories: {totalCalories} ( = {totalStars} stars)
                </div>
                {/* <div className='today-stars-details'>
                    Today's Total Stars: {totalStars}
                </div> */}

            </div>
            <div className='submit-button'>
                <button onClick={submitData}>Submit</button>
            </div>
        </>
    );
}