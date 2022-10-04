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
    deleteButton.innerText = "Del"
    deleteButton.classList.add("button");

    const alterButton = document.createElement("button");
    alterButton.innerText = "Alter"
    alterButton.classList.add("button");

    const delDiv = document.createElement("div");
    delDiv.classList.add("inline");
    const alterDiv = document.createElement("div");
    alterDiv.classList.add("inline");
    const radioDiv = document.createElement("div");
    radioDiv.classList.add("inline");
    delDiv.append(deleteButton);
    alterDiv.append(alterButton);
    radioDiv.append(radioButton)

    buttonDiv.append(radioDiv, delDiv, alterDiv)
    taskDiv.append(titleDiv, buttonDiv);


    if (task.completed == false) {
        openTasks.append(taskDiv)
    } else {
        closedTasks.append(taskDiv)
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

function addTask(){
    window.location.href = "addTask.html"
}
