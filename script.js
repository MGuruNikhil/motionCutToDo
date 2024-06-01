// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const taskText = document.createElement('span');
    taskText.innerText = task.text;
    taskText.style.textDecoration = task.completed ? "line-through" : "none";
    taskText.style.opacity = task.completed ? "0.5" : "1"

    const taskInput = document.createElement('input');
    taskInput.id = index.toString();
    taskInput.type = 'text';
    taskInput.value = task.text;
    taskInput.addEventListener('keyup', (e) => {
      if(e.key === 'Enter') {
        editTask(index);
      }
    })

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<img src="./assets/tick.png" alt="tick" width="20" height="20">';
    completeBtn.className = task.completed ? 'complete' : '';
    completeBtn.addEventListener('click', () => toggleComplete(index));

    const editBtn = document.createElement('button');
    editBtn.innerHTML = task.editing ? '<img src="./assets/save.png" alt="save" width="20" height="20">' : '<img src="./assets/edit.png" alt="edit" width="20" height="20">';
    editBtn.className = 'edit';
    editBtn.addEventListener('click', () => editTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<img src="./assets/delete.png" alt="delete" width="20" height="20">';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    if(!task.editing) {
      taskElement.appendChild(taskText);
    } else {
      taskElement.appendChild(taskInput);
    }
    taskElement.appendChild(actionsDiv);

    taskList.appendChild(taskElement);
  });
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false, editing: false });
    taskInput.value = '';
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasksToLocalStorage();
  renderTasks();
}

// Edit a task
function editTask(index) {
  const inputTag = document.getElementById(index.toString());
  if (tasks[index].editing) {
    if (inputTag) {
      const newText = inputTag.value.trim();
      tasks[index].text = newText;
    }
  }
  tasks[index].editing = !tasks[index].editing;
  saveTasksToLocalStorage();
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Initial render
renderTasks();