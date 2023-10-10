document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar-container");
  const prevMonthBtn = document.getElementById("prevMonthBtn");
  const nextMonthBtn = document.getElementById("nextMonthBtn");

  let currentDate = new Date(); // Initialize with the current date
  let currentMonthIndex = currentDate.getMonth();

  function generateCalendar(monthIndex, year) {
      const currentYear = year || currentDate.getFullYear();
      const currentMonth = monthIndex;

      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];

      const monthName = monthNames[currentMonth];

      let calendarHTML = `<h2>${monthName} ${currentYear}</h2><table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>`;

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayIndex; i++) {
          calendarHTML += "<td></td>";
      }

      // Add cells for each day of the month
      for (let day = 1; day <= daysInMonth; day++) {
          const dayOfWeek = (firstDayIndex + day - 1) % 7;
          const isSunday = dayOfWeek === 0;
          const tdClass = isSunday ? "sunday" : "";

          calendarHTML += `<td class="${tdClass}">${day}</td>`;
          if ((firstDayIndex + day) % 7 === 0) {
              calendarHTML += "</tr><tr>";
          }
      }

      calendarHTML += "</tr></table>";
      calendarContainer.innerHTML = calendarHTML;
  }

  generateCalendar(currentMonthIndex);

  function showPrevMonth() {
      if (currentMonthIndex > 0) {
          currentMonthIndex--;
      } else {
          currentMonthIndex = 11;
          currentDate.setFullYear(currentDate.getFullYear() - 1); // Move to the previous year
      }
      generateCalendar(currentMonthIndex, currentDate.getFullYear());
  }

  function showNextMonth() {
      if (currentMonthIndex < 11) {
          currentMonthIndex++;
      } else {
          currentMonthIndex = 0;
          currentDate.setFullYear(currentDate.getFullYear() + 1); // Move to the next year
      }
      generateCalendar(currentMonthIndex, currentDate.getFullYear());
  }

  prevMonthBtn.addEventListener("click", showPrevMonth);
  nextMonthBtn.addEventListener("click", showNextMonth);
});
