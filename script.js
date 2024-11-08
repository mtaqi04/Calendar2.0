let currentDate = new Date();
const bookings = JSON.parse(localStorage.getItem("bookings")) || {};

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();

    document.getElementById("prevMonth").addEventListener("click", () => {
        changeMonth(-1);
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        changeMonth(1);
    });
});

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarBody = document.querySelector("#calendar tbody");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let row = document.createElement("tr");
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("td");
        cell.textContent = day;
        const fullDate = `${year}-${month + 1}-${day}`;

        if (bookings[fullDate]) {
            cell.classList.add("booked");
            const eventLabel = document.createElement("div");
            eventLabel.classList.add("event-label");
            eventLabel.textContent = bookings[fullDate];
            cell.appendChild(eventLabel);
        }

        cell.addEventListener("click", () => handleDateClick(fullDate));
        row.appendChild(cell);

        if ((day + firstDay) % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }
    calendarBody.appendChild(row);
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function handleDateClick(date) {
    const reason = prompt("Enter the reason for booking:");
    if (reason) {
        bookings[date] = reason;
        localStorage.setItem("bookings", JSON.stringify(bookings));
        renderCalendar();
    }
}
