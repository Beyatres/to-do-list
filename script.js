const addBtn = document.getElementById("add-btn");
const newTaskInput = document.getElementById("wrapper").querySelector("input");
const taskContainer = document.getElementById("tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = () => {
    countValue.innerText = taskCount;
};

const showError = () => {
    error.style.display = "block";
    setTimeout(() => {
        error.style.display = "none";
    }, 2000);
};

const addTaskToDOM = (taskName, completed) => {
    // Add task to the DOM
    const task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `
        <input type="checkbox" class="task-check" ${completed ? 'checked' : ''}>
        <span class="taskname">${taskName}</span>
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    `;
    taskContainer.appendChild(task);
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();

    if (!taskName) {
        showError();
        return;
    }

    addTaskToDOM(taskName, false);
    taskCount += 1;
    displayCount();
    saveTasksToLocalStorage(); // Save tasks to local storage
    newTaskInput.value = "";
};

const handleTaskContainerClick = (event) => {
    const target = event.target;

    if (target.classList.contains("delete")) {
        // Handle delete button click
        const taskElement = target.closest(".task");
        taskElement.remove();
        taskCount -= 1;
        displayCount();
        saveTasksToLocalStorage(); // Save tasks to local storage
    } else if (target.classList.contains("edit")) {
        // Handle edit button click
        const taskElement = target.closest(".task");
        const taskNameElement = taskElement.querySelector(".taskname");
        newTaskInput.value = taskNameElement.innerText;
        taskElement.remove();
        taskCount -= 1;
        displayCount();
        saveTasksToLocalStorage(); // Save tasks to local storage
    } else if (target.classList.contains("task-check")) {
        // Handle checkbox click
        const taskElement = target.closest(".task");
        const completed = target.checked;
        taskElement.querySelector(".taskname").classList.toggle("completed", completed);
        saveTasksToLocalStorage(); // Save tasks to local storage
    }
    // Handle other actions if needed
};

const saveTasksToLocalStorage = () => {
    const tasks = Array.from(document.querySelectorAll(".task")).map((taskElement) => {
        const taskName = taskElement.querySelector(".taskname").innerText;
        const completed = taskElement.querySelector(".task-check").checked;
        return { taskName, completed };
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(({ taskName, completed }) => {
        addTaskToDOM(taskName, completed);
        if (!completed) {
            taskCount += 1;
        }
    });

    displayCount();
};

taskContainer.addEventListener("click", handleTaskContainerClick);
addBtn.addEventListener("click", addTask);

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Additional code for initializing task count and other functionality...