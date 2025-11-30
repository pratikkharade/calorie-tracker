import { useState, useRef, useEffect, use } from "react";
import { DayPicker } from "react-day-picker";
import { getLongDate } from '../HelpFunctions';
import "react-day-picker/dist/style.css";
import "./Calendar.css";

export default function Calendar({ enabledDates, getSelectedDate }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(new Date());
    const ref = useRef();

    const enabledSet = new Set(
        (enabledDates || []).map((d) => new Date(d).toDateString())
    );

    const isDisabled = (date) => !enabledSet.has(date.toDateString());

    const oldestDate = new Date(enabledDates.slice(-1)[0]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        getSelectedDate(getLongDate(selected));
    }, [selected]);

    return (
        <div className="calendar-wrapper" ref={ref}>
            <div className='calendar-date'
                onClick={() => setIsOpen(!isOpen)}
            >
                {`📅 ${getLongDate(selected)}`}
            </div>

            {isOpen && (
                <div className="calendar-popup">
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={(date) => {
                            setSelected(date);
                            setIsOpen(false);
                        }}
                        disabled={isDisabled}
                        defaultMonth={selected}
                        fromMonth={oldestDate}
                        toMonth={new Date()}
                    />
                </div>
            )}
        </div>
    );
}