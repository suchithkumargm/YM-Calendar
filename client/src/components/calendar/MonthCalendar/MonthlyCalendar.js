import React, { useState, useEffect } from 'react';

import GenerateMonthlyCalendar from './GenerateMonthlyCalendar';
import './MonthlyCalendar.css';

const MonthlyCalendar = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [holidays, setHolidays] = useState([]);
    const [buttonClick, setButtonClick] = useState(false);

    const handleButtonClick = () => {
        setButtonClick(!buttonClick)
    }

    const showPrevYear = () => {
        setCurrentYear(currentYear - 1);
    }

    const showNextYear = () => {
        setCurrentYear(currentYear + 1);
    }

    const showPrevMonth = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(currentMonthIndex - 1);
        } else {
            setCurrentMonthIndex(11);
            setCurrentYear(currentYear - 1);
        }
    }

    const showNextMonth = () => {
        if (currentMonthIndex < 11) {
            setCurrentMonthIndex(currentMonthIndex + 1);
        } else {
            setCurrentMonthIndex(0);
            setCurrentYear(currentYear + 1);
        }
    }

    const updateHolidays = (newHoliday) => {
        // Clone the current holidays state and add the new holiday
        setHolidays([...holidays, newHoliday]);
        console.log(holidays)
    }

    useEffect(() => {
        // Fetch the list of holidays from the server
        fetch('http://localhost:5000/calendar/getholidays')
            .then((response) => response.json())
            .then((data) => {
                setHolidays(data);
            })
            .catch((error) => {
                console.error('Error while fetching holidays:', error);
            });
    }, [buttonClick]);

    return (
        <div className="inner-month-container">
            <GenerateMonthlyCalendar
                currentYear={currentYear}
                currentMonthIndex={currentMonthIndex}
                showPrevYear={showPrevYear}
                showNextYear={showNextYear}
                showPrevMonth={showPrevMonth}
                showNextMonth={showNextMonth}
                monthNames={monthNames}
                holidays={holidays}
                updateHolidays={updateHolidays}
                handleButtonClick={handleButtonClick}
            />
        </div>
    );
}

export default MonthlyCalendar;