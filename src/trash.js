import { trashedTasks } from "./addTask";

export default function loadTrash() {
    const trash = document.createElement('div');
    const trashText = document.createElement('h1');
    trashText.textContent = "Trashed Tasks";
    trashText.classList.add('trash-text');
    trash.appendChild(trashText);

    trashedTasks.forEach(task => {
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
        trash.appendChild(taskElement);
    });

    return trash;
}
