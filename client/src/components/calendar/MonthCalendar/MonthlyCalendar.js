import React, { useState } from 'react';
import './MonthlyCalendar.css';
import GenerateMonthlyCalendar from './generateMonthlyCalendar.js';

const MonthlyCalendar = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

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
            />
        </div>
    );
}

export default MonthlyCalendar;
