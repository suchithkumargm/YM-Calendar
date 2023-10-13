import React, { useState } from 'react';

import YearCalendar from './YearCalendar/YearCalendar.js';
import MonthlyCalendar from './MonthCalendar/MonthlyCalendar.js';
import './Calendar.css';

const Calendar = () => {
    const [selectedOption, setSelectedOption] = useState('This Year'); // Set the initial state to "thisMonth"

    // Function to handle option change
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.textContent);
    };

    // Render the selected component based on the selectedOption
    const renderSelectedComponent = () => {
        if (selectedOption === 'This Year') {
            return <YearCalendar handleOptionChange={handleOptionChange}/>;
        } else if (selectedOption === 'This Month') {
            return <MonthlyCalendar handleOptionChange={handleOptionChange}/>;
        }
    };

    return (
        <div className='main-calendar'>
            {/* <div className='inner-container'> */}
                {renderSelectedComponent()}
            {/* </div> */}
        </div>
    );
};

export default Calendar;
