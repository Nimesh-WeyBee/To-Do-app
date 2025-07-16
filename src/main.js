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
              <div class="card__header-title">${ele.l_title}</div>
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
              <div class="card__item-title">${task.t_name}</div>
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

displayData(currentData.lists);

console.log(currentData);

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

  // Task status (toggle complete)
  const statusDiv =
    e.target.closest(".card__status") ||
    e.target.closest(".card__item-title") ||
    e.target.closest(".card__item");

  if (statusDiv.className.match(/card__item-(\d+)/)) {
    const t_id = Number(statusDiv.className.match(/card__item-(\d+)/)[1]);
    console.log(t_id);
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

  // Task remove (delete task)
  const removeDiv = e.target.closest(".card__remove");
  if (removeDiv) {
    const itemDiv = removeDiv.parentElement;
    const t_id = Number(itemDiv.className.match(/card__item-(\d+)/)[1]);
    deleteTask(l_id, t_id);
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
