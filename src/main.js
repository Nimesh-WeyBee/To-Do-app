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

// intract with DOM to display data

// function renderLists() {
//   const container = document.getElementById("lists-container");
//   container.innerHTML = "";
//   currentData.lists.forEach(list => {
//     const listDiv = document.createElement("div");
//     listDiv.className = "list";
//     listDiv.innerHTML = `<h3>${list.l_title} (${list.date})</h3>`;
//     const tasksUl = document.createElement("ul");
//     list.tasks.forEach(task => {
//       const taskLi = document.createElement("li");
//       taskLi.textContent = `${task.t_name} [${task.status ? "✓" : " "}]`;
//       tasksUl.appendChild(taskLi);
//     });
//     listDiv.appendChild(tasksUl);
//     container.appendChild(listDiv);
//   });
// }

// Initial render
// document.addEventListener("DOMContentLoaded", renderLists);
