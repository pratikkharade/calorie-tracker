import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwb5ycYk_cyBzKDu3Z3ob6vbbp37xC8Qzx4J_jNxoyQdYSrYVBEI44w6NIFFl1_EAqEVw/exec';

export default function App() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const fetchData = async () => {
        try {
            const res = await axios.get(SHEET_URL);
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addData = async () => {
        try {
            await axios.get(`${SHEET_URL}?name=${encodeURIComponent(name)}&value=${encodeURIComponent(value)}`);
            setName('');
            setValue('');
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Google Sheet Data</h1>
            <ul>
                {data.map((row, i) => (
                    <li key={i}>{row.join(' | ')}</li>
                ))}
            </ul>

            <h2>Add Row</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={addData}>Add</button>
        </div>
    );
}