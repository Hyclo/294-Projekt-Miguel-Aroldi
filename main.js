let tasks = [];

fetch("http://localhost:3000/tasks")
  .then(function (data) {
    return data.json();
  })
  .then(function (json) {
    tasks = json;
    let currentSite = window.location.href.split(
      "/294%20Projekt%20Miguel%20Aroldi/Fontend/"
    )[1];
    if (currentSite == "index.html") {
      displayTasks(tasks);
    }
  });

function displayTasks(tasks) {
  const openTasks = document.getElementById("openTasks");
  const closedTasks = document.getElementById("closedTasks");
  openTasks.replaceChildren();
  closedTasks.replaceChildren();

  for (let taskIndex in tasks) {
    const task = tasks[taskIndex];

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("block");

    const titleDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.innerText = `${task.id} ${task.title}`;
    title.classList.add("normalText");
    titleDiv.append(title);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("container");

    const buttonContainer  = document.createElement("div");
    buttonContainer.classList.add("container");

    const delDiv = document.createElement("div");
    delDiv.classList.add("inline");
    const alterDiv = document.createElement("div");
    alterDiv.classList.add("inline");
    const radioDiv = document.createElement("div");
    radioDiv.classList.add("inline");

    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.onclick = () => {
      changeTaskCompletion(task);
    };
    if (task.completed == true) {
      radioButton.checked = true;
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("button");
    deleteButton.onclick = () => {
      deleteTask(task.id);
      displayTasks(tasks);
    };

    const alterButton = document.createElement("button");
    alterButton.innerText = "Edit";
    alterButton.classList.add("button");
    alterButton.onclick = () => {
      redirectTask(task.id);
    };

    delDiv.append(deleteButton);
    alterDiv.append(alterButton);
    radioDiv.append(radioButton);

    buttonContainer.append(radioDiv, delDiv, alterDiv);
    buttonDiv.append(buttonContainer);
    taskDiv.append(titleDiv, buttonDiv);

    if (task.completed == false) {
      openTasks.append(taskDiv);
    } else {
      closedTasks.append(taskDiv);
    }
  }
}

function validate(document) {
  const mailRegex = "\\S{1,}@\\S{1,}\\.\\S{2,4}";
  if (document.id == "eMail") {
    if (document.value.match(mailRegex)) {
      return true;
    }
    alert("please enter valid E-Mail");
    return false;
  }

  if (
    document.value == null ||
    document.value == undefined ||
    document.value == NaN ||
    document.value == ""
  ) {
    alert("Please enter a valid value!");
    return false;
  }
  return true;
}

function loadDataFromBackend() {
  fetch("http://localhost:3000/tasks")
    .then(function (data) {
      return data.json();
    })
    .then(function (json) {
      tasks = json;
      displayTasks(tasks);
    });
}

function addTask() {
  const todoForm = document.getElementById("addTodo");

  validate(todoForm);

  const body = {
    id: 10,
    completed: false,
    title: todoForm.value,
  };

  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(function () {
    window.location.href = "index.html";
    loadDataFromBackend();
  });
}

function deleteTask(id) {
  fetch(`http://localhost:3000/task/${id}`, {
    method: "DELETE",
  }).then(function () {
    loadDataFromBackend();
  });
}

function alterTask(id) {
  const todoForm = document.getElementById("alterTodo");

  validate(todoForm);

  const body = {
    id: id,
    completed: false,
    title: todoForm.value,
  };

  fetch("http://localhost:3000/tasks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(function () {
    window.location.href = "index.html";
    loadDataFromBackend();
  });
}

function changeTaskCompletion(task) {
  const body = {
    id: task.id,
    completed: true,
    title: task.title,
  };

  fetch("http://localhost:3000/tasks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(function () {
    loadDataFromBackend();
  });
}

function redirectTask(id) {
  window.location.href = `alterTask.html#${id}`;
}

function submitLogin() {
  const usernameForm = document.getElementById("usernameInput");
  const emailForm = document.getElementById("eMail");

  if (validate(usernameForm) && validate(emailForm)) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      "username =" + usernameForm.value + ";" + expires + ";path=/";
    $;
    document.cookie = "email =" + emailForm.value + ";" + expires + ";path=/";

    fetch("http://localhost:3000/tasks", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(function () {
      window.location.href = "index.html";
      loadDataFromBackend();
    });
  }
}
