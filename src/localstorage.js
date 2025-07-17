// It have the data and it can store and retrive the data

let currentData = {
  u_name: "Emily",
  lists: [
    {
      l_id: 0,
      l_title: "Daily To-Do",
      date: "2025-07-16",
      tasks: [
        { t_id: 0, t_name: "Stay positive", status: true },
        { t_id: 1, t_name: "Deep clean floors.", status: false },
        { t_id: 4, t_name: "Organize closets", status: false },
      ],
    },
    {
      l_id: 1,
      l_title: "Work To-Do",
      date: "2025-07-17",
      tasks: [
        { t_id: 0, t_name: "Stay positive", status: true },
        { t_id: 1, t_name: "Deep clean floors", status: false },
        { t_id: 2, t_name: "Wash wind", status: false },
      ],
    },
    {
      l_id: 2,
      l_title: "Work List",
      date: "2025-08-18",
      tasks: [
        { t_id: 0, t_name: "Stay positive", status: false },
        { t_id: 1, t_name: "Deep clean floors", status: false },
        { t_id: 2, t_name: "Wash windows", status: false },
      ],
    },
    {
      l_id: 3,
      l_title: "Self-care List",
      date: "2025-08-18",
      tasks: [
        { t_id: 0, t_name: "Stay positive", status: true },
        { t_id: 1, t_name: "Deep clean floors", status: false },
        { t_id: 3, t_name: "sanitize high-touch areas.", status: false },
        { t_id: 4, t_name: "Organize closets", status: false },
      ],
    },
    { l_id: 4, l_title: "Add Title", date: "", tasks: [] },
  ],
};

// Sync CurrentData with localstorage
function syncData() {
  const data = localStorage.getItem("todoData");
  if (data) {
    currentData = JSON.parse(data);
  }
}

// fetch data
function fetchData() {
  const data = localStorage.getItem("todoData");
  return data ? JSON.parse(data) : currentData;
}

// Save data
function saveData(data) {
  localStorage.setItem("todoData", JSON.stringify(data));
}

// exporting all functions and currentData
export { fetchData, saveData, currentData, syncData };
