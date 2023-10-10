const yearlyCalendar = document.getElementById("yearly-calendar");
const yearDisplay = document.getElementById("year-display");
const prevYearButton = document.getElementById("prev-year");
const nextYearButton = document.getElementById("next-year");

let currentYear = 2023; // Initial year

// Function to generate the calendar for a given year
function generateCalendar(year) {
    yearlyCalendar.innerHTML = ""; // Clear the existing calendar

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const monthName = new Date(year, monthIndex, 1).toLocaleString('default', { month: 'long' });
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        const monthElement = document.createElement("div");
        monthElement.classList.add("month");

        const header = document.createElement("h2");
        header.textContent = monthName;

        const table = document.createElement("table");
        const thead = document.createElement("thead"); // Table header for weekdays
        const tbody = document.createElement("tbody");

        // Create a row for weekdays (Sunday through Saturday)
        const weekdaysRow = document.createElement("tr");
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        dayNames.forEach(dayName => {
            const th = document.createElement("th");
            th.textContent = dayName;
            weekdaysRow.appendChild(th);
        });
        thead.appendChild(weekdaysRow);

        let dayCounter = 1;

        for (let week = 0; week < 6; week++) {
            const tr = document.createElement("tr");

            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const td = document.createElement("td");

                if (week === 0 && dayOfWeek < new Date(year, monthIndex, 1).getDay()) {
                    td.textContent = "";
                    td.classList.add("empty");
                } else if (dayCounter <= daysInMonth) {
                    td.textContent = dayCounter;
                    dayCounter++;

                    // Check if it's a Sunday (dayOfWeek === 0) and add the "sunday" class
                    if (dayOfWeek === 0) {
                        td.classList.add("sunday");
                    }
                } else {
                    td.textContent = "";
                    td.classList.add("empty");
                }

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        monthElement.appendChild(header);
        monthElement.appendChild(table);
        yearlyCalendar.appendChild(monthElement);
    }

    yearDisplay.textContent = year;
}

// Initial calendar generation
generateCalendar(currentYear);

// Button click event listeners
prevYearButton.addEventListener("click", () => {
    currentYear--;
    generateCalendar(currentYear);
});

nextYearButton.addEventListener("click", () => {
    currentYear++;
    generateCalendar(currentYear);
});
