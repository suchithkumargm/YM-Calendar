import { isSameDay } from 'date-fns'; // Import date-fns functions

// Function to generate the calendar for a given month
const generateMonthlyCalendar = (currentDate) => { // Receive currentDate as a parameter
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  let dayCounter = 1;

  // Find the first day of the month
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  for (let week = 0; week < 6; week++) {
    const weekDays = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      if (week === 0 && dayOfWeek < firstDayOfMonth) {
        weekDays.push(<td key={dayOfWeek} className="empty"></td>);
      } else if (dayCounter <= daysInMonth) {
        const currentDateOfMonth = new Date(year, month, dayCounter);

        // Check if the current date is the same as the date being rendered
        const isCurrentDate = isSameDay(currentDateOfMonth, currentDate);

        // Apply yellow color to the current date
        const dayStyle = isCurrentDate ? { color: 'yellow' } : {};

        weekDays.push(
          <td
            key={dayOfWeek}
            className={dayOfWeek === 0 ? "sunday" : ""}
            style={dayStyle}
          >
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

  return (
    <div className="month">
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
};

export default generateMonthlyCalendar;
