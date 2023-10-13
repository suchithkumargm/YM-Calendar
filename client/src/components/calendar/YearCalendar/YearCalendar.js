import React, { useState } from 'react';

import GenerateYearCalendar from './generateYearCalendar.js';
import FilterDropdown from '../../FilterDropdown/FilterDropdown.js';
import './YearCalendar.css';

const YearlyCalendar = ({ handleOptionChange }) => {
	const [currentYear, setCurrentYear] = useState(2023); // Initial year

	// Button click event listeners
	const handlePrevYearClick = () => {
		setCurrentYear(currentYear - 1);
	};

	const handleNextYearClick = () => {
		setCurrentYear(currentYear + 1);
	};

	const months = GenerateYearCalendar(currentYear);

	return (
		<div className='inner-container'>
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
			<div className='filter' >
				<FilterDropdown handleOptionChange={handleOptionChange} />
			</div>
			<div className="yearly-calendar" id="yearly-calendar">
				{months}
			</div>
		</div>
	);
};

export default YearlyCalendar;