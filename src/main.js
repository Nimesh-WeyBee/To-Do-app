import { syncData } from "./localstorage.js";
import {
  insertList,
  insertTask,
  editListName,
  editListDate,
  editTaskName,
  editTaskStatus,
  deleteList,
  deleteTask,
  currentData,
  fetchData,
  saveData,
} from "./operations.js";

const mainBodyEle = document.querySelector(".main__body");

function displayData(data) {
  mainBodyEle.innerHTML = "";
  let html = ``;

  const colorList = [0, 1, 2, 3, 4];
  data.forEach((ele, i) => {
    html = `
        <div class="main__body-card main__body-card-color-${
          colorList[i % colorList.length]
        }" id = ${ele.l_id}>
          <div class="card__header fs-secondary-heading fw-sub-heading">
            <div class="card__header-titleContainer">
              <div class="card__header-title" data-edit="list" data-lid="${
                ele.l_id
              }">${ele.l_title}</div>
              <div class="card__header-trash">
                <img src="images/trash.svg" alt="trash btn" />
              </div>
            </div>

            <div class="card__header-dateContainer">
              <div class="card__header-dateIcon">
                <img src="images/calender.svg" alt="" />
              </div>
              <div class="card__header-date">Today</div>
            </div>
          </div>
          <div class="card__body">
          ${ele.tasks
            .map(
              (task) => `
              <div class="card__item card__item-${task.t_id} ${
                task.status ? "completed" : ""
              }">
              <div class="card__status"></div>
              <div class="card__item-title" data-edit="task" data-lid="${
                ele.l_id
              }" data-tid="${task.t_id}">${task.t_name}</div>
              <div class="card__remove"></div>
            </div>`
            )
            .join("")}
    </div>
      <form class="card__footer">
        <input type="text" placeholder="+ Add a task" id="inp${ele.l_id}" />
      </form>
    </div>`;

    mainBodyEle.insertAdjacentHTML("beforeend", html);
  });
}

// Set current date in header
function setCurrentDate() {
  const dateEle = document.getElementById("currentDate");
  const today = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" };
  dateEle.textContent = today.toLocaleDateString(undefined, options);
}

// Fetch and set current weather using wttr.in (no API key needed)
function setCurrentWeather() {
  const tempEle = document.getElementById("temprature");
  const iconEle = document.getElementById("wetherIcon");

  function updateWeather(query) {
    fetch(`https://wttr.in/${query}?format=j1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.current_condition && data.current_condition[0]) {
          const tempC = data.current_condition[0].temp_C;
          tempEle.textContent = `${tempC}°C`;
          // Use weatherDesc for icon selection (simple mapping)
          const desc =
            data.current_condition[0].weatherDesc[0].value.toLowerCase();
          let iconSrc = "images/sun.svg";
          if (desc.includes("cloud")) iconSrc = "images/cloud.svg";
          else if (desc.includes("rain")) iconSrc = "images/rain.svg";
          else if (desc.includes("snow")) iconSrc = "images/snow.svg";
          iconEle.innerHTML = `<img src="${iconSrc}" alt="weather icon" />`;
        } else {
          tempEle.textContent = "N/A";
        }
      })
      .catch(() => {
        tempEle.textContent = "N/A";
      });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        updateWeather(`${lat},${lon}`);
      },
      () => {
        // fallback to city name or IP-based location
        updateWeather(""); // wttr.in will use IP location
      }
    );
  } else {
    updateWeather(""); // fallback
  }
}

// Event delegation for all events in main__body
mainBodyEle.addEventListener("click", (e) => {
  e.preventDefault();

  // Find the closest card
  const card = e.target.closest(".main__body-card");
  if (!card) return;
  const l_id = Number(card.id);

  // Trash icon (delete list)
  if (e.target.closest(".card__header-trash")) {
    deleteList(l_id);
    displayData(currentData.lists);
    return;
  }

  // Task remove (delete task)
  const removeDiv = e.target.closest(".card__remove");
  if (removeDiv) {
    const itemDiv = removeDiv.parentElement;
    const t_id = Number(itemDiv.className.match(/card__item-(\d+)/)[1]);
    deleteTask(l_id, t_id);
    displayData(currentData.lists);
    return;
  }

  // Inplace edit for list title
  if (e.target.classList.contains("card__header-title")) {
    const l_id = Number(e.target.dataset.lid);
    const oldTitle = e.target.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldTitle;
    input.className = "inline-edit-list-title";
    e.target.replaceWith(input);
    input.focus();

    input.addEventListener("blur", () => {
      if (input.value.trim() && input.value !== oldTitle) {
        editListName(l_id, input.value.trim());
      }
      displayData(currentData.lists);
    });
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        input.blur();
      }
    });
    return;
  }

  // Inplace edit for task name
  if (e.target.classList.contains("card__item-title")) {
    const l_id = Number(e.target.dataset.lid);
    const t_id = Number(e.target.dataset.tid);
    const oldName = e.target.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldName;
    input.className = "inline-edit-task-title";
    e.target.replaceWith(input);
    input.focus();

    input.addEventListener("blur", () => {
      if (input.value.trim() && input.value !== oldName) {
        editTaskName(l_id, t_id, input.value.trim());
      }
      displayData(currentData.lists);
    });
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        input.blur();
      }
    });
    return;
  }

  // Task status (toggle complete)
  const statusDiv =
    e.target.closest(".card__status") ||
    e.target.closest(".card__item-title") ||
    e.target.closest(".card__item");

  if (statusDiv?.className?.match(/card__item-(\d+)/)) {
    const t_id = Number(statusDiv.className.match(/card__item-(\d+)/)[1]);
    const list = currentData.lists.find((l) => l.l_id === l_id);
    const task = list.tasks.find((t) => t.t_id === t_id);
    editTaskStatus(l_id, t_id, !task.status);
    displayData(currentData.lists);
    return;
  } else if (statusDiv) {
    const itemDiv = statusDiv.parentElement;
    const t_id = Number(itemDiv.className.match(/card__item-(\d+)/)[1]);
    const list = currentData.lists.find((l) => l.l_id === l_id);
    const task = list.tasks.find((t) => t.t_id === t_id);
    editTaskStatus(l_id, t_id, !task.status);
    displayData(currentData.lists);
    return;
  }
});

// Event delegation for adding a task (submit on form)
mainBodyEle.addEventListener("submit", (e) => {
  e.preventDefault();
  const card = e.target.closest(".main__body-card");
  if (!card) return;
  const l_id = Number(card.id);
  const input = e.target.querySelector("input[type='text']");
  if (input && input.value.trim()) {
    insertTask(l_id, input.value.trim());
    displayData(currentData.lists);
    input.value = "";
  }
});

// Add event listener for Add List button
document.querySelector(".addList button").addEventListener("click", () => {
  insertList("Add Title", "");
  displayData(currentData.lists);
});

document.addEventListener("DOMContentLoaded", () => {
  syncData();
  displayData(currentData.lists);
  setCurrentDate();
  setCurrentWeather();
});
