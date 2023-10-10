import React, { useState } from 'react';

import generateYearCalendar from './generateYearCalendar';
import './YearCalendar.css';

const YearlyCalendar = () => {
  const [currentYear, setCurrentYear] = useState(2023); // Initial year

  // Button click event listeners
  const handlePrevYearClick = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYearClick = () => {
    setCurrentYear(currentYear + 1);
  };

  const months = generateYearCalendar(currentYear);

  return (
    <div className="calendar">
      <div className='calendar-year'>
        <h1>
          <button id="prev-year" onClick={handlePrevYearClick}>
            &lt;
          </button>
          <span id="year-display">{currentYear}</span>
          <button id="next-year" onClick={handleNextYearClick}>
            &gt;
          </button>
        </h1>
      </div>
      <div className="yearly-calendar" id="yearly-calendar">
        {months}
      </div>
    </div>
  );
};

export default YearlyCalendar;