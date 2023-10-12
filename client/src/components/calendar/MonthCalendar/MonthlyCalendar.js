import React, { Component } from 'react';

import GenerateMonthlyCalendar from './GenerateMonthlyCalendar';
import './MonthlyCalendar.css'

class MonthlyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentYear: new Date().getFullYear(),
            currentMonthIndex: new Date().getMonth(),
            monthNames: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            holidays: [],
        };
    }

    showPrevYear = () => {
        this.setState({ currentYear: this.state.currentYear - 1 });
    }

    showNextYear = () => {
        this.setState({ currentYear: this.state.currentYear + 1 });
    }

    showPrevMonth = () => {
        if (this.state.currentMonthIndex > 0) {
            this.setState({ currentMonthIndex: this.state.currentMonthIndex - 1 });
        } else {
            this.setState({ currentMonthIndex: 11, currentYear: this.state.currentYear - 1 });
        }
    }

    showNextMonth = () => {
        if (this.state.currentMonthIndex < 11) {
            this.setState({ currentMonthIndex: this.state.currentMonthIndex + 1 });
        } else {
            this.setState({ currentMonthIndex: 0, currentYear: this.state.currentYear + 1 });
        }
    }

    updateHolidays = (newHoliday) => {
        this.setState({ holidays: [...this.state.holidays, newHoliday] });
    }

    componentDidMount() {
        // Fetch the list of holidays from the server
        fetch('http://localhost:5000/calendar/getholidays')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ holidays: data });
            })
            .catch((error) => {
                console.error('Error while fetching holidays:', error);
            });
    }

    render() {
        return (
            <div className="inner-month-container">
                <GenerateMonthlyCalendar
                    currentYear={this.state.currentYear}
                    currentMonthIndex={this.state.currentMonthIndex}
                    showPrevYear={this.showPrevYear}
                    showNextYear={this.showNextYear}
                    showPrevMonth={this.showPrevMonth}
                    showNextMonth={this.showNextMonth}
                    monthNames={this.state.monthNames}
                    holidays={this.state.holidays}
                    updateHolidays={this.updateHolidays}
                />
            </div>
        );
    }
}

export default MonthlyCalendar;
