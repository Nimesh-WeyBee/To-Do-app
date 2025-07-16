import { currentData, fetchData, saveData } from "./localstorage.js";

// Modify the currentActiveList

// getting currentlist

// function to insert
function insertList(l_title, date) {
  const newId = currentData.lists.length
    ? Math.max(...currentData.lists.map((l) => l.l_id)) + 1
    : 0;
  currentData.lists.push({
    l_id: newId,
    l_title: l_title,
    date: date,
    tasks: [],
  });
  saveData(currentData);
}

function insertTask(l_id, t_name) {
  const list = currentData.lists.find((l) => l.l_id === l_id);
  if (list) {
    const newTId = list.tasks.length
      ? Math.max(...list.tasks.map((t) => t.t_id)) + 1
      : 0;
    list.tasks.push({
      t_id: newTId,
      t_name,
      status: false,
    });
    saveData(currentData);
  }
}

// function to edit
function editListName(l_id, l_name) {
  const list = currentData.lists.find((l) => l.l_id === l_id);
  if (list) {
    list.l_title = l_name;
    saveData(currentData);
  }
}

function editListDate(l_id, date) {
  const list = currentData.lists.find((l) => l.l_id === l_id);
  if (list) {
    list.date = date;
    saveData(currentData);
  }
}

function editTaskName(l_id, t_id, t_name) {
  const list = currentData.lists.find((l) => l.l_id === l_id);
  if (list) {
    const task = list.tasks.find((t) => t.t_id === t_id);
    if (task) {
      task.t_name = t_name;
      saveData(currentData);
    }
  }
}

function editTaskStatus(l_id, t_id, status) {
  const list = currentData.lists.find((l) => l.l_id === l_id);
  if (list) {
    const task = list.tasks.find((t) => t.t_id === t_id);
    if (task) {
      task.status = status;
      saveData(currentData);
    }
  }
}

//function to delete
function deleteList(l_id) {
  const idx = currentData.lists.findIndex((l) => l.l_id === l_id);
  if (idx !== -1) {
    currentData.lists.splice(idx, 1);
    saveData(currentData);
  }
}

function deleteTask(l_id, t_id) {
  const list = currentData.lists.find((l) => l.l_id === l_id);
  if (list) {
    const idx = list.tasks.findIndex((t) => t.t_id === t_id);
    if (idx !== -1) {
      list.tasks.splice(idx, 1);
      saveData(currentData);
    }
  }
}

export {
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
};
