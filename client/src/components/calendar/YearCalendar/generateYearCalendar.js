import { isSameDay } from 'date-fns'; // Import date-fns functions

// Function to generate the calendar for a given year
const GenerateYearCalendar = (year) => {
    const months = [];
    const currentDate = new Date(); // Get the current date

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
                    const currentDateOfMonth = new Date(year, monthIndex, dayCounter);

                    // Check if the current date is the same as the date being rendered
                    const isCurrentDate = isSameDay(currentDateOfMonth, currentDate);

                    // add id to the current date
                    const todayId=isCurrentDate ? 'today-date':null

                    weekDays.push(
                        <td key={dayOfWeek} className={dayOfWeek === 0 ? "sunday" : ""} id={todayId}>
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
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((dayName, index) => (
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
};

export default GenerateYearCalendar;