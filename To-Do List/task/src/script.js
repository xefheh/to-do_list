let addBtn = document.getElementById("add-task-button");
let removeBtn = document.getElementsByClassName("delete-btn");
let taskList = document.getElementById("task-list");
let inputTask = document.getElementById("input-task");
let toDo = [ ];

function loadStorage() {
    if (localStorage.getItem("tasks")) {
        toDo = JSON.parse(localStorage.getItem("tasks")) || [];
        loadTasks();
    }
}

loadStorage();

function loadTasks() {
    let temp = "";
    toDo.forEach(function (item, index) {
        inputTask.value = '';
        temp += `
        <li>
            <input type="checkbox" class="check" onchange="checked(${index})" ${item.checked ? 'checked' : ''}>
            <span class="task">${item.name}</span>
            <button class="delete-btn" onclick="remove(${index})">Delete</button>
        </li>
        `
    })
    taskList.innerHTML = temp;
}

function add() {
    let task = { name: inputTask.value, checked: false };
    if (inputTask.value !== "") {
        toDo.push(task);
        loadTasks();
        update();
    }
}

function update() {
    localStorage.setItem("tasks", JSON.stringify(toDo));
}

function remove(index) {
    toDo.splice(index, 1);
    loadTasks();
    update();
    return this.parentNode.remove();
}

function checked(index) {
    toDo[index].checked = !toDo[index].checked;
    update();
    loadTasks();
}

function clearAll() {
    localStorage.clear();
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    toDo = [];
}
