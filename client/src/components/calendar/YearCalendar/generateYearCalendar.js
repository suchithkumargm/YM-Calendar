// Function to generate the calendar for a given year
const generateYearCalendar = (year) => {
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
};

export default generateYearCalendar;