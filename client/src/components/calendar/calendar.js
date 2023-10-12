import React, { useState } from 'react';

import YearCalendar from './YearCalendar/YearCalendar.js';
import MonthlyCalendar from './MonthCalendar/MonthlyCalendar.js';
import './Calendar.css';

const Calendar = () => {
    const [selectedOption, setSelectedOption] = useState('thisYear'); // Set the initial state to "thisMonth"

    // Function to handle option change
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Render the selected component based on the selectedOption
    const renderSelectedComponent = () => {
        if (selectedOption === 'thisYear') {
            return <YearCalendar />;
        } else if (selectedOption === 'thisMonth') {
            return <MonthlyCalendar />;
        }
    };

    return (
        <div className='main-calendar'>
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="thisYear">This Year</option>
                <option value="thisMonth">This Month</option>
            </select>
            {renderSelectedComponent()}
        </div>
    );
};

export default Calendar;
