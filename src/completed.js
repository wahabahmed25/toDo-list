import { addTaskInfo } from "./addTask";

export default function loadCompleted() {
    // Filter completed tasks
    let completedTasks = addTaskInfo.filter(task => task.completed);

    const completed = document.createElement('div');
    const completedText = document.createElement('h1');
    completedText.textContent = "Completed Tasks";
    completedText.classList.add('completed-text');
    completed.appendChild(completedText);

    completedTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-element');

        const titleElement = document.createElement('p');
        titleElement.classList.add('task-title');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('task-description');
        descriptionElement.textContent = task.description;

        const dateElement = document.createElement('p');
        dateElement.classList.add('task-date');
        dateElement.textContent = task.dueDate;

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(dateElement);
        completed.appendChild(taskElement);
    });

    return completed;
}
