document.addEventListener("DOMContentLoaded", function() {
    const monthSelect = document.getElementById("month");
    const calendarContainer = document.getElementById("calendar-container");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
  
    // Initialize the current month to the selected month from the dropdown
    let currentMonthIndex = parseInt(monthSelect.value);
  
    // Function to generate the calendar based on the selected month
    function generateCalendar(monthIndex) {
      const currentDate = new Date();
      currentDate.setMonth(monthIndex);
  
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
  
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
  
      const monthName = monthNames[currentMonth];
  
      let calendarHTML = `<h2>${monthName} ${currentYear}</h2><table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>`;
  
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayIndex; i++) {
        calendarHTML += "<td></td>";
      }
  
      // Add cells for each day of the month
      for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<td>${day}</td>`;
        if ((firstDayIndex + day) % 7 === 0) {
          // Start a new row for each Sunday
          calendarHTML += "</tr><tr>";
        }
      }
  
      calendarHTML += "</tr></table>";
  
      // Update the calendar container with the new HTML
      calendarContainer.innerHTML = calendarHTML;
    }
  
    // Initial calendar generation
    generateCalendar(currentMonthIndex);
  
    // Listen for changes in the selected month
    monthSelect.addEventListener("change", function() {
      currentMonthIndex = parseInt(monthSelect.value);
      generateCalendar(currentMonthIndex);
    });
  
    // Function to display the previous month
    function showPrevMonth() {
      if (currentMonthIndex > 0) {
        currentMonthIndex--;
        monthSelect.value = currentMonthIndex.toString();
        generateCalendar(currentMonthIndex);
      }
    }
  
    // Function to display the next month
    function showNextMonth() {
      if (currentMonthIndex < 11) {
        currentMonthIndex++;
        monthSelect.value = currentMonthIndex.toString();
        generateCalendar(currentMonthIndex);
      }
    }
  
    // Event listeners for the arrow buttons
    prevMonthBtn.addEventListener("click", showPrevMonth);
    nextMonthBtn.addEventListener("click", showNextMonth);
  });
  