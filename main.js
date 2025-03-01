// Dropdown functionality
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");
  const items = dropdown.querySelectorAll(".dropdown-item");

  toggle.onclick = function () {
    menu.classList.toggle("show");
  };

  items.forEach((item) => {
    item.onclick = function () {
      toggle.textContent = item.textContent;
      toggle.dataset.value = item.dataset.value;
      menu.classList.remove("show");
    };
  });
});

window.onclick = function (e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("show");
    });
  }
};

function addSession(trainer, day, time, color) {
  const sessionList = document.getElementById("session-list");

  let session = document.createElement("div");
  session.classList.add("session");
  session.innerHTML = `
      <div class="session-holder">
        <p>Trainer: ${trainer}</p>
        <p>Time: ${time}</p>
        <p>Day: ${day}</p>
        <p>Color: <span style="background-color:${color};color:white;padding:3px">${color}</span></p>
        <button class="delete-button"><strong>X</strong></button>
      </div>
    `;

  session.querySelector(".delete-button").onclick = function () {
    session.remove();
    deleteSession(trainer, day, time);
  };

  sessionList.appendChild(session);
}

function saveSession() {
  const trainer = document.querySelector("#trainer-select .dropdown-toggle")
    .dataset.value;
  const day = document.querySelector("#day-select .dropdown-toggle").dataset
    .value;
  const time = document.querySelector("#time-select .dropdown-toggle").dataset
    .value;
  const color = document.querySelector("#bg-color-select .dropdown-toggle")
    .dataset.value;

  if (!trainer || !day || !time || !color) return;

  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

  if (
    sessions.some(
      (s) => s.trainer === trainer && s.day === day && s.time === time
    )
  )
    return;

  sessions.push({ trainer, day, time, color });
  localStorage.setItem("sessions", JSON.stringify(sessions));

  addSession(trainer, day, time, color);
}

function deleteSession(trainer, day, time) {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions = sessions.filter(
    (s) => !(s.trainer === trainer && s.day === day && s.time === time)
  );
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

function loadSessions() {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions.forEach((session) => {
    addSession(session.trainer, session.day, session.time, session.color);
  });
}

document.getElementById("save-button").onclick = saveSession;
window.onload = loadSessions;
