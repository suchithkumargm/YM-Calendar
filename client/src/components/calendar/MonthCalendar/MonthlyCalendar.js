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
		const currentDate = new Date(currentYear, currentMonth, 1);
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		const firstDayIndex = currentDate.getDay();
		const today = new Date();
	  
		const monthNames = [
		  "January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
	  
		const calendarRows = [];
		let dayCells = [];
	  
		for (let i = 0; i < firstDayIndex; i++) {
		  dayCells.push(<td key={i}></td>);
		}
	  
		for (let day = 1; day <= daysInMonth; day++) {
		  const dayOfWeek = (firstDayIndex + day - 1) % 7;
		  const isSunday = dayOfWeek === 0;
		  const isToday = currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
	  
		  const tdClass = isSunday ? "sunday" : "";
		  const tdId = isToday ? "today-month-date" : "";
	  
		  dayCells.push(
			<td key={day} className={tdClass} id={tdId}>
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
				<span id="month-display">{monthNames[currentMonth]}</span> {/* Use monthNames here */}
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
			{generateCalendar()}
			<hr />
			<div className="event-container">
				<div className="date-and-day">selected day and date</div>
				<div className="event-name">event</div>
			</div>
		</div>
	);
}

export default MonthlyCalendar;
