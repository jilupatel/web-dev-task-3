// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(span);

        if (task.completed) {
            li.classList.add('completed');
        }

        // Complete task button
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        // Edit task button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newTaskText = prompt('Edit task:', span.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                span.textContent = newTaskText.trim();
                saveTasks();
            }
        });

        // Delete task button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Add task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = { text: taskText, completed: false };
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Initial load
    loadTasks();
});
