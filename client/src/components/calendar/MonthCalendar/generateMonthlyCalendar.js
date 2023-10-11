import React, { useState } from 'react';

const GenerateMonthlyCalendar = (props) => {
    const {
        currentYear,
        currentMonthIndex,
        showPrevYear,
        showNextYear,
        showPrevMonth,
        showNextMonth,
        monthNames,
        holidays,
    } = props;

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isHolidayState, setIsHolidayState] = useState(false);

    const handleDateClick = (day, month, year) => {
        const newSelectedDate = new Date(year, month, day);
        setSelectedDate(newSelectedDate);

        // Send a POST request to check if it's a holiday
        fetch('http://localhost:5000/calender/checkholiday', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: newSelectedDate.toISOString().split('T')[0], // Format as 'yyyy-mm-dd'
                typeOfHoliday: 'yet to be decided',
                holidayName: 'holiday',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsHolidayState(data.workingDay);
            })
            .catch((error) => {
                console.error('Error while checking holiday:', error);
            });
    }

    const isHoliday = (day, month, year) => {
        const formattedDate = `${year}-${month +1}-${day}`;
        return holidays.includes(formattedDate);
    }

    const currentMonth = currentMonthIndex;
    const currentDate = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const firstDayIndex = currentDate.getDay();
    const today = new Date();

    const calendarRows = [];
    let dayCells = [];

    for (let i = 0; i < firstDayIndex; i++) {
        dayCells.push(<td key={i}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = (firstDayIndex + day -1) % 7;
        const isSunday = dayOfWeek === 0;
        const isToday = currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
        const isSelected = currentDate.toDateString() === selectedDate.toDateString();

        const tdClass = isSunday ? "sunday" : "";
        const tdId = isToday ? "today-month-date" : "";
        const selectedTdClass = isSelected ? "selected-date" : "";

        dayCells.push(
            <td
                key={day}
                className={`${tdClass} ${selectedTdClass} ${isHoliday(day, currentMonth, currentYear) ? 'holiday' : ''}`}
                id={tdId}
                onClick={() => handleDateClick(day, currentMonth, currentYear)}
            >
                {day}
            </td>
        );

        currentDate.setDate(currentDate.getDate() + 1);

        if ((firstDayIndex + day) % 7 === 0) {
            calendarRows.push(<tr key={day}>{dayCells}</tr>);
            dayCells = [];
        }
    }

    if (dayCells.length > 0) {
        while (dayCells.length < 7) {
            dayCells.push(<td key={dayCells.length}></td>);
        }
        calendarRows.push(<tr key="last">{dayCells}</tr>);
    }

    const formattedSelectedDate = `${selectedDate.toLocaleString('en-in', { weekday: 'long' })} ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

    return (
        <>
            <div className="month-calendar-container">
                <div className="navigation">
                    <div className="navigation-year">
                        <button onClick={showPrevYear}>&lt;</button>
                        <span id="year-display">{currentYear}</span>
                        <button onClick={showNextYear}>&gt;</button>
                    </div>
                    <div className="navigation-month">
                        <button onClick={showPrevMonth}>&lt;</button>
                        <span id="month-display">{monthNames[currentMonth]}</span>
                        <button onClick={showNextMonth}>&gt;</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calendarRows}
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="event-container">
                <div className="date-and-day">{formattedSelectedDate}</div>
                <div className="event-name">No Events</div>
            </div>
        </>
    );
}

export default GenerateMonthlyCalendar;
