import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './calTrac_logo.png';
import WorkoutHistory from './WorkoutHistory/WorkoutHistory';
import { getDateForSheet, getLongDate, roundOff, formatWorkoutHistoryData } from './HelpFunctions';
import Summary from './Summary/Summary';
import sheets from "./../config.json";

const SHEET_1_URL = sheets.sheet_1;

export default function App() {
    const [data, setData] = useState([]);
    const [workoutHistoryData, setWorkoutHistoryData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('');

    const [crunches, setCrunches] = useState('');
    const [crunchesCalories, setCrunchesCalories] = useState(0);
    const [walk, setWalk] = useState('');
    const [walkCalories, setWalkCalories] = useState(0);
    const [justFit, setJustFit] = useState('');
    const [justFitCalories, setJustFitCalories] = useState('');
    const [vibrationPlate, setVibrationPlate] = useState('');
    const [vibrationPlateCalories, setVibrationPlateCalories] = useState(0);
    const [planks, setPlanks] = useState('');
    const [planksCalories, setPlanksCalories] = useState(0);
    const [bike, setBike] = useState('');
    const [bikeCalories, setBikeCalories] = useState(0);
    const [row, setRow] = useState('');
    const [rowCalories, setRowCalories] = useState(0);

    const [totalCalories, setTotalCalories] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [cumulativeTotalCalories, setCumulativeTotalCalories] = useState(0);
    const [cumulativeTotalStars, setCumulativeStars] = useState(0);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(SHEET_1_URL);
            setCumulativeTotalCalories(roundOff(res.data[0][1]) % 30000);
            setCumulativeStars(roundOff(res.data[1][1]) % 300);
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
            `todayDate=${getDateForSheet()}&` +
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
            `bike=${bike || 0}&` +
            `bikeCalories=${bikeCalories || 0}&` +
            `row=${row || 0}&` +
            `rowCalories=${rowCalories || 0}&` +
            `totalCalories=${totalCalories || 0}`;

        try {
            setLoadingMsg('Saving your data!!!');
            setIsLoading(true);
            await axios.get(`${SHEET_1_URL}?${params}`);
            setCrunches('');
            setWalk('');
            setJustFit('');
            setJustFitCalories('');
            setVibrationPlate('');
            setPlanks('');
            setBike('');
            setRow('');
            fetchData();
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setLoadingMsg('');
        }
    };

    // CRUNCHES
    useEffect(() => {
        setCrunchesCalories(crunches / 10);
    }, [crunches]);

    // WALK
    useEffect(() => {
        setWalkCalories(walk * 100);
    }, [walk]);

    // JUST FIT

    // VIBRATION PLATE
    useEffect(() => {
        setVibrationPlateCalories(vibrationPlate * 2);
    }, [vibrationPlate]);

    // PLANKS
    useEffect(() => {
        setPlanksCalories(roundOff(planks * 5 / 60));
    }, [planks]);

    // BIKE
    useEffect(() => {
        setBikeCalories(bike * 5);
    }, [bike]);

    // ROW
    useEffect(() => {
        setRowCalories(row * 8);
    }, [row]);

    // TOTAL CALORIES
    useEffect(() => {
        const total = crunchesCalories + walkCalories + (parseInt(justFitCalories) || 0) + vibrationPlateCalories + planksCalories + bikeCalories + rowCalories;
        setTotalCalories(roundOff(total));
    }, [crunchesCalories, walkCalories, justFitCalories, vibrationPlateCalories, planksCalories, bikeCalories, rowCalories]);

    // TOTAL STARS
    useEffect(() => {
        setTotalStars(roundOff(totalCalories / 100));
    }, [totalCalories]);

    // LOADING PAGE
    useEffect(() => {
        setLoadingMsg('Loading...');
        fetchData();
    }, []);

    useEffect(() => {
        const workoutHistory = formatWorkoutHistoryData(data);
        setWorkoutHistoryData(workoutHistory);
    }, [data]);

    return (
        <>
            {isLoading &&
                <div className='loading-wrapper'>{loadingMsg}</div>
            }
            <div className='app-title'>
                <img src={logo} className='logo'></img>
            </div>
            <div className='history-wrapper'>
                {workoutHistoryData && <WorkoutHistory data={workoutHistoryData} totalStars={cumulativeTotalStars} totalCalories={cumulativeTotalCalories} />}
            </div>

            < Summary totalCalories={cumulativeTotalCalories} totalStars={cumulativeTotalStars} />

            <div className="today-date">
                Today: {getLongDate()}
            </div>

            <div className='wrapper-container'>
                <div className='wrapper'>
                    <div className='title'>Crunches</div>
                    <div className='input'>
                        <input value={crunches} onChange={e => setCrunches(e.target.value)}></input> nos.
                    </div>
                    <div className='calories'>
                        {crunchesCalories} Cals (1 Cal / 10 crunches)
                    </div>
                </div>

                <div className='wrapper'>
                    <div className='title'>Walk</div>
                    <div className='input'>
                        <input value={walk} onChange={e => setWalk(e.target.value)}></input> miles
                    </div>
                    <div className='calories'>
                        {walkCalories} Cals (100 Cals / mile)
                    </div>
                </div>

                <div className='wrapper'>
                    <div className='title'>Just Fit</div>
                    <div className='input'>
                        <input placeholder='mins' value={justFit} onChange={e => setJustFit(e.target.value)}></input>
                        <input placeholder='Calories' value={justFitCalories} onChange={e => setJustFitCalories(e.target.value)}></input>
                    </div>
                    <div className='calories'>
                        {justFitCalories || 0} Cals (188 Cals / 24 mins)
                    </div>
                </div>

                <div className='wrapper'>
                    <div className='title'>Vibration Plate</div>
                    <div className='input'>
                        <input value={vibrationPlate} onChange={e => setVibrationPlate(e.target.value)}></input> mins
                    </div>
                    <div className='calories'>
                        {vibrationPlateCalories} Cals (2 Cals / min)
                    </div>
                </div>

                <div className='wrapper'>
                    <div className='title'>Planks</div>
                    <div className='input'>
                        <input value={planks} onChange={e => setPlanks(e.target.value)}></input> secs
                    </div>
                    <div className='calories'>
                        {planksCalories} Cals (5 Cals / min)
                    </div>
                </div>

                <div className='wrapper'>
                    <div className='title'>Bike</div>
                    <div className='input'>
                        <input value={bike} onChange={e => setBike(e.target.value)}></input> mins
                    </div>
                    <div className='calories'>
                        {bikeCalories} Cals (5 Cals / min)
                    </div>
                </div>

                <div className='wrapper'>
                    <div className='title'>Row</div>
                    <div className='input'>
                        <input value={row} onChange={e => setRow(e.target.value)}></input> mins
                    </div>
                    <div className='calories'>
                        {rowCalories} Cals (8 Cals / min)
                    </div>
                </div>
            </div>

            <div className='today-details'>
                <div className='today-calories-details'>
                    This session: {totalCalories} Cals ( = {roundOff(totalStars)} stars)
                </div>
            </div>
            <div className='submit-button'>
                <button onClick={submitData}>Submit</button>
            </div>
        </>
    );
}