let tasks = [];

fetch("http://localhost:3000/tasks")
  .then(function (data) {
    return data.json();
  })
  .then(function (json) {
    tasks = json;
    displayTasks(tasks);
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

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("container");

    const title = document.createElement("h3");
    title.innerText = `${task.id} ${task.title}`;
    title.classList.add("normaltext");
    titleDiv.append(title);

    const radioButton = document.createElement("input");
    radioButton.type = "radio";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Del";
    deleteButton.classList.add("button");
    deleteButton.onclick = () => {
		deleteTask(task.id);
        displayTasks(tasks)
	}

    const alterButton = document.createElement("button");
    alterButton.innerText = "Alter";
    alterButton.classList.add("button");

    const delDiv = document.createElement("div");
    delDiv.classList.add("inline");
    const alterDiv = document.createElement("div");
    alterDiv.classList.add("inline");
    const radioDiv = document.createElement("div");
    radioDiv.classList.add("inline");
    delDiv.append(deleteButton);
    alterDiv.append(alterButton);
    radioDiv.append(radioButton);

    buttonDiv.append(radioDiv, delDiv, alterDiv);
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
	fetch("http://localhost:3000/contacts").then(function (data) {
		return data.json()
	}).then(function (json) {
		tasks = json
		displayTasks(tasks)
	})
}

function addTask() {
  const todoForm = document.getElementById("addTodo");
  const todoTitle = document.getElementById("TodoTitleTask");
  todoTitle.innerText = "ADD TODO";

  validate(todoForm);

  const body = {
    id: 10,
    completed: false,
    title: todoForm.value,
  };

  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(function () {
    window.location.href = "index.html";
    loadDataFromBackend()
});
}

function deleteTask(id){
    fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE",
      }).then(function () {
        window.location.href = "index.html";
        loadDataFromBackend()
    });
}
