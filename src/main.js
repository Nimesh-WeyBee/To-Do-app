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

  const colorList = [0, 1, 2, 3];
  data.forEach((ele, i) => {
    html = `
        <div class="main__body-card main__body-card-color-${
          colorList[i % colorList.length]
        }">
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
              <div class="card__item-${task.t_id} ${
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

saveData(currentData);

document.querySelector(".card__header-trash").addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);
});
