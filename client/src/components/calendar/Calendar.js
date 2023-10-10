import React, { useState } from 'react';
import './Calendar.css'; // Import the CSS file

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);

  const months = Array.from({ length: 12 }, (_, i) => i);

  const isSunday = (day) => day % 7 === 0;

  const renderMonth = (month) => {
    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = date.getDay();

    return (
      <div className="month" key={month}>
        <h2>{date.toLocaleString('default', { month: 'long' })}</h2>
        <table>
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <th key={index} className={isSunday(index) ? 'sunday' : ''}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {[...Array(firstDayOfWeek).fill(null), ...Array(daysInMonth).keys()].map((day) => (
                <td
                  key={day}
                  className={isSunday(firstDayOfWeek + day) ? 'sunday' : ''}
                  onClick={() => setSelectedMonth(month)}
                >
                  {day + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="calendar">
      <div className="year-selector">
        <h1>{year}</h1>
        <button onClick={() => setYear(year - 1)}>Previous Year</button>
        <button onClick={() => setYear(year + 1)}>Next Year</button>
      </div>
      {!selectedMonth ? (
        <div className="year-view">
          {months.map((month) => renderMonth(month))}
        </div>
      ) : (
        <div className="month-view">
          {renderMonth(selectedMonth)}
          <button onClick={() => setSelectedMonth(null)}>Back to Year View</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
