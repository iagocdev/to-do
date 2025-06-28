let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, done: false, subtasks: [] });
    input.value = "";
    saveTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function editTask(index) {
  const newText = prompt("Editar tarefa:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
  }
}

function addSubtask(index, inputElement) {
  const text = inputElement.value.trim();
  if (text !== "") {
    tasks[index].subtasks.push({ text, done: false });
    inputElement.value = "";
    saveTasks();
  }
}

function toggleSubtask(taskIndex, subIndex) {
  tasks[taskIndex].subtasks[subIndex].done = !tasks[taskIndex].subtasks[subIndex].done;
  saveTasks();
}

function editSubtask(taskIndex, subIndex) {
  const newText = prompt("Editar subtarefa:", tasks[taskIndex].subtasks[subIndex].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[taskIndex].subtasks[subIndex].text = newText.trim();
    saveTasks();
  }
}

function deleteSubtask(taskIndex, subIndex) {
  tasks[taskIndex].subtasks.splice(subIndex, 1);
  saveTasks();
}

function renderTasks() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    task.subtasks = task.subtasks || [];
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");

    li.innerHTML = `
      <div>
        <span onclick="toggleTask(${index})">${task.text}</span>
        <div>
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      </div>
      ${task.done ? '<div class="status-msg">✔ Tarefa concluída</div>' : ''}
    `;

    const subtasksDiv = document.createElement("div");
    subtasksDiv.className = "subtasks";
    task.subtasks.forEach((subtask, subIndex) => {
      const sub = document.createElement("div");
      sub.className = "subtask" + (subtask.done ? " done" : "");
      sub.innerHTML = `
        <span onclick="toggleSubtask(${index}, ${subIndex})">${subtask.text}</span>
        <div>
          <button onclick="editSubtask(${index}, ${subIndex})">✏️</button>
          <button onclick="deleteSubtask(${index}, ${subIndex})">🗑️</button>
        </div>
      `;
      subtasksDiv.appendChild(sub);
    });

    const addSub = document.createElement("div");
    addSub.className = "add-subtask";
    addSub.innerHTML = `
      <input type="text" placeholder="Adicionar subtarefa..." onkeypress="if(event.key==='Enter') addSubtask(${index}, this)">
      <button onclick="addSubtask(${index}, this.previousElementSibling)">➕</button>
    `;

    subtasksDiv.appendChild(addSub);
    li.appendChild(subtasksDiv);
    list.appendChild(li);
  });
}

renderTasks();
