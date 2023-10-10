import React, { Component } from 'react';
import './Calendar.css';

class YearlyCalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentYear: 2023, // Initial year
		};
	}

	// Function to generate the calendar for a given year
	generateCalendar(year) {
		const months = [];
		for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
			const monthName = new Date(year, monthIndex, 1).toLocaleString('default', { month: 'long' });
			const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
			const days = [];

			let dayCounter = 1;

			for (let week = 0; week < 6; week++) {
				const weekDays = [];

				for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
					if (week === 0 && dayOfWeek < new Date(year, monthIndex, 1).getDay()) {
						weekDays.push(<td key={dayOfWeek} className="empty"></td>);
					} else if (dayCounter <= daysInMonth) {
						weekDays.push(
							<td key={dayOfWeek} className={dayOfWeek === 0 ? "sunday" : ""}>
								{dayCounter}
							</td>
						);
						dayCounter++;
					} else {
						weekDays.push(<td key={dayOfWeek} className="empty"></td>);
					}
				}

				days.push(<tr key={week}>{weekDays}</tr>);
			}

			months.push(
				<div key={monthIndex} className="month">
					<h2>{monthName}</h2>
					<table>
						<thead>
							<tr>
								{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, index) => (
									<th key={index}>{dayName}</th>
								))}
							</tr>
						</thead>
						<tbody>{days}</tbody>
					</table>
				</div>
			);
		}

		return months;
	}

	// Button click event listeners
	handlePrevYearClick = () => {
		this.setState((prevState) => ({
			currentYear: prevState.currentYear - 1,
		}));
	};

	handleNextYearClick = () => {
		this.setState((prevState) => ({
			currentYear: prevState.currentYear + 1,
		}));
	};

	render() {
		const { currentYear } = this.state;
		const months = this.generateCalendar(currentYear);

		return (
			<div className="calendar">
				<div className='calendar-year'>
					<h1>
						<button id="prev-year" onClick={this.handlePrevYearClick}>
							&lt;
						</button>
						<span id="year-display">{currentYear}</span>
						<button id="next-year" onClick={this.handleNextYearClick}>
							&gt;
						</button>
					</h1>
				</div>
				<div className="yearly-calendar" id="yearly-calendar">
					{months}
				</div>
			</div>
		);
	}
}

export default YearlyCalendar;