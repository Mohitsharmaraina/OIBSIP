let pendingTasks = [];
let completedTasks = [];

// Add Task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      text: taskText,
      id: new Date().getTime(), // Unique ID for task
    };

    pendingTasks.push(task);
    taskInput.value = '';
    renderTasks();
  }
}

// Render Tasks
function renderTasks() {
  const pendingList = document.getElementById('pendingTasksList');
  const completedList = document.getElementById('completedTasksList');

  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  // Display pending tasks
  pendingTasks.forEach((task) => {
    const taskItem = createTaskItem(task, false);
    pendingList.appendChild(taskItem);
  });

  // Display completed tasks
  completedTasks.forEach((task) => {
    const taskItem = createTaskItem(task, true);
    completedList.appendChild(taskItem);
  });
}

// Create Task Item
function createTaskItem(task, isCompleted) {
  const taskItem = document.createElement('li');
  taskItem.textContent = task.text;

  if (isCompleted) {
    taskItem.classList.add('completed');
  }

  // Create Edit, Complete, and Delete buttons
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.onclick = () => editTask(task.id, isCompleted);

  const completeBtn = document.createElement('button');
  completeBtn.textContent = isCompleted ? 'Undo' : 'Complete';
  completeBtn.classList.add('complete-btn');
  completeBtn.onclick = () => toggleTaskCompletion(task.id);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteTask(task.id, isCompleted);

  // Append buttons to task item
  taskItem.appendChild(editBtn);
  taskItem.appendChild(completeBtn);
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

// Edit Task
function editTask(taskId, isCompleted) {
  const taskText = prompt("Edit your task:");
  if (taskText) {
    if (isCompleted) {
      completedTasks = completedTasks.map(task =>
        task.id === taskId ? { ...task, text: taskText } : task
      );
    } else {
      pendingTasks = pendingTasks.map(task =>
        task.id === taskId ? { ...task, text: taskText } : task
      );
    }
    renderTasks();
  }
}

// Toggle Task Completion
function toggleTaskCompletion(taskId) {
  const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const [task] = pendingTasks.splice(taskIndex, 1);
    completedTasks.push(task);
  } else {
    const completedIndex = completedTasks.findIndex(task => task.id === taskId);
    const [task] = completedTasks.splice(completedIndex, 1);
    pendingTasks.push(task);
  }
  renderTasks();
}

// Delete Task
function deleteTask(taskId, isCompleted) {
  if (isCompleted) {
    completedTasks = completedTasks.filter(task => task.id !== taskId);
  } else {
    pendingTasks = pendingTasks.filter(task => task.id !== taskId);
  }
  renderTasks();
}
