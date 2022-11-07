//inputing the form elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const listTasks = document.querySelector("#list-tasks");
const listCompleted = document.querySelector("#list-completed");


//storing the tasks in the array
var tasklist = loadTask();
tasklist.forEach(createTask);

form.addEventListener("submit", (e) => {
  // prevents the default action to be taken
  e.preventDefault();

  //checks if input value is null
  if (input?.value == null || input?.value == "") return;

  var task = {
    id: Math.random(),
    created: new Date(),
    value: input.value,
    completed: false,
  };

  tasklist.push(task);
  saveTask(task);
  createTask(task);
  input.value = "";
});

//creates a new task
function createTask(task) {
  const item = document.createElement("li");
  const label = document.createElement("input");
  const checkbox = document.createElement("input");
  const edit = document.createElement("img");
  const customBox = document.createElement("span");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTask();
  });
  customBox.classList.add("custom-checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.classList.add("default-checkbox");
  label.value = task.value;
  label.readOnly = true;
  label.classList.add("label");
  edit.src = "./ui/Pencil.svg";
  //can edit the task by pressing the edit button
  edit.addEventListener("click", (e) => {
    e.stopPropagation();
    label.readOnly = false;
    label.focus();
  });

  item.addEventListener("click", function () {
    if (task.completed == true) {
      task.completed = false;
    } else task.completed = true;
    checkbox.checked = task.completed;
    saveTask();
    if (task.completed == false) {
      listTasks?.append(item);
      return;
    }
    listCompleted?.append(item);
  });
  //save the new task by pressing enter
  label.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      label.readOnly = true;
      if (label.value == null || label.value == "") {
        label.value = task.value;
      } else {
        task.value = label.value;
        saveTask();
      }
    }
  });

  //adds all the newly created elements to the unordered list
  item.append(checkbox, customBox, label, edit);
  if (task.completed == false) {
    listTasks?.append(item);
    return;
  }
  listCompleted?.append(item);
}

function saveTask(task) {
  localStorage.setItem("TASKS", JSON.stringify(tasklist));
}

function loadTask() {
  let taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
