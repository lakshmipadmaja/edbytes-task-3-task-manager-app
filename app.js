"use strict";

const STORAGE_KEY = "practice-tasks";
const list = document.getElementById("list");
const form = document.getElementById("form");
const input = document.getElementById("text");
const message = document.getElementById("message");
const emptyState = document.getElementById("empty-state");
const taskCount = document.getElementById("task-count");

let tasks = loadTasks();

// Load previously saved tasks. Invalid or unavailable storage is handled safely.
function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((item) => typeof item === "string") : [];
  } catch (error) {
    return [];
  }
}

// Save the current task list after every change.
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    showMessage("Could not save tasks in this browser. Check your storage settings.", true);
    return false;
  }
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function renderTasks() {
  list.replaceChildren();

  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete task: ${task}`);
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      showMessage("Task deleted.");
    });

    item.append(taskText, deleteButton);
    list.append(item);
  });

  const count = tasks.length;
  taskCount.textContent = `${count} ${count === 1 ? "task" : "tasks"}`;
  emptyState.hidden = count > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    showMessage("Please enter a task before adding.", true);
    input.focus();
    return;
  }

  tasks.push(text);
  saveTasks();
  renderTasks();
  input.value = "";
  input.focus();
  showMessage("Task added.");
});

// Render tasks loaded from the browser when the page opens or refreshes.
renderTasks();
