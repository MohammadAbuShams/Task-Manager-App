document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('status-filter').addEventListener('change', filterTasks);

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks(tasks);

function addTask() {
  const taskInput = document.getElementById('task-input').value;
  if (taskInput.trim() === '') {
    alert('Please enter a task description');
    return;
  }

  const task = {
    id: Date.now(),
    description: taskInput,
    status: 'pending' 
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
  document.getElementById('task-input').value = ''; 
}

function renderTasks(tasksToRender) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasksToRender.forEach((task) => {
    const li = document.createElement('li');
    li.className = task.status;
    li.innerHTML = `
      <span>${task.description}</span>
      <div>
        <select onchange="updateStatus(${task.id}, this.value)">
          <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function editTask(taskId) {
  const newDescription = prompt('Enter new description');
  if (newDescription.trim() === '') {
    alert('Description cannot be empty');
    return;
  }

  tasks = tasks.map(task => {
    if (task.id === taskId) {
      task.description = newDescription;
    }
    return task;
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

function updateStatus(taskId, newStatus) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      task.status = newStatus;
    }
    return task;
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

function filterTasks() {
  const filterValue = document.getElementById('status-filter').value;
  const filteredTasks = tasks.filter(task => {
    if (filterValue === 'all') return true;
    return task.status === filterValue;
  });

  renderTasks(filteredTasks);
}
