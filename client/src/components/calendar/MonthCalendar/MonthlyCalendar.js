import React, { useState } from 'react';
import { format, isSameDay, startOfMonth } from 'date-fns'; // Import date-fns functions

import generateMonthlyCalendar from './generateYearCalendar';
import './MonthlyCalendar.css';

const MonthlyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Initial date (current date)

  // Button click event listeners
  const handlePrevMonthClick = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonthClick = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const monthCalendar = generateMonthlyCalendar(currentDate);

  return (
    <div className="calendar">
      <div className='calendar-month'>
        <h1>
          <button id="prev-month" onClick={handlePrevMonthClick}>
            &lt;
          </button>
          <span id="month-display">{format(currentDate, 'MMMM yyyy')}</span>
          <button id="next-month" onClick={handleNextMonthClick}>
            &gt;
          </button>
        </h1>
      </div>
      <div className="monthly-calendar" id="monthly-calendar">
        {monthCalendar}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
