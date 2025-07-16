// It have the data and it can store and retrive the data

let currentData = {
  u_name: "Emily",
  lists: [
    {
      l_id: 0,
      l_title: "Daily To-Do",
      date: "16/07/25",
      tasks: [
        {
          t_id: 0,
          t_name: "Stay positive",
          status: true,
        },
        {
          t_id: 1,
          t_name: "Deep clean floors",
          status: false,
        },
        {
          t_id: 2,
          t_name: "Wash windows",
          status: false,
        },
      ],
    },
    {
      l_id: 1,
      l_title: "Work To-Do",
      date: "17/07/25",
      tasks: [
        {
          t_id: 0,
          t_name: "Stay positive",
          status: true,
        },
        {
          t_id: 1,
          t_name: "Deep clean floors",
          status: false,
        },
        {
          t_id: 2,
          t_name: "Wash windows",
          status: false,
        },
      ],
    },
    {
      l_id: 2,
      l_title: "Work List",
      date: "18/08/25",
      tasks: [
        {
          t_id: 0,
          t_name: "Stay positive",
          status: true,
        },
        {
          t_id: 1,
          t_name: "Deep clean floors",
          status: false,
        },
        {
          t_id: 2,
          t_name: "Wash windows",
          status: false,
        },
      ],
    },
    {
      l_id: 3,
      l_title: "Self-care List",
      date: "16/08/25",
      tasks: [
        {
          t_id: 0,
          t_name: "Stay positive",
          status: true,
        },
        {
          t_id: 1,
          t_name: "Deep clean floors",
          status: false,
        },
        {
          t_id: 2,
          t_name: "Wash windows",
          status: false,
        },
      ],
    },
    {
      l_id: 4,
      l_title: "Add Title",
      date: "",
      tasks: [],
    },
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
