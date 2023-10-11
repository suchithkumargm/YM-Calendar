import React, { useState } from 'react';
import './MonthlyCalendar.css';

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

	const generateCalendar = () => {
		const currentMonth = currentMonthIndex;
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
		const monthName = monthNames[currentMonth];
	  
		const calendarRows = [];
		let dayCells = [];
	  
		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDayIndex; i++) {
		  dayCells.push(<td key={i}></td>);
		}
	  
		for (let day = 1; day <= daysInMonth; day++) {
		  dayCells.push(
			<td key={day} className={day % 7 === 0 ? "sunday" : ""}>
			  {day}
			</td>
		  );
	  
		  if ((firstDayIndex + day) % 7 === 0) {
			calendarRows.push(<tr key={day}>{dayCells}</tr>);
			dayCells = [];
		  }
		}
	  
		if (dayCells.length > 0) {
		  // Fill in remaining cells for the last row
		  while (dayCells.length < 7) {
			dayCells.push(<td key={dayCells.length}></td>);
		  }
		  calendarRows.push(<tr key="last">{dayCells}</tr>);
		}
	  
		return (
		  <div className="month-calendar-container">
			<div className="navigation">
			  <div className="navigation-year">
				<button onClick={showPrevYear}>&lt;</button>
				<span id="year-display">{currentYear}</span>
				<button onClick={showNextYear}>&gt;</button>
			  </div>
			  <div className="navigation-month">
				<button onClick={showPrevMonth}>&lt;</button>
				<span id="month-display">{monthName}</span>
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
		);
	  }
	  

	return (
		<div className="inner-month-container">
			{/* <div className="calendar-container"> */}
			{generateCalendar()}
			{/* </div> */}
			<hr />
			<div className="event-container">
				<div className="date-and-day">selected day and date</div>
				<div className="event-name">event</div>
			</div>
		</div>
	);
}

export default MonthlyCalendar;
