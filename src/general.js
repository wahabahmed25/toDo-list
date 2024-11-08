import { addTaskInfo, trashedTasks } from "./addTask";

export default function loadGeneral() {
    // Only include tasks that are not marked as completed
    let generalTasks = addTaskInfo.filter(task => task.assign === "general" && !task.completed);

    const general = document.createElement('div');
    const generalText = document.createElement('h1');
    generalText.textContent = "General";
    generalText.classList.add('general-text');
    general.appendChild(generalText);

    generalTasks.forEach((task) => {
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

        // Create a checkbox input
        const checkmarkCheckbox = document.createElement('input');
        checkmarkCheckbox.setAttribute('type', 'checkbox');
        checkmarkCheckbox.checked = task.completed || false;
        
        //trash button
        const trashButton = document.createElement('button')
        trashButton.textContent = 'Trash'
        trashButton.classList.add('trash-button');
        trashButton.addEventListener('click',()=>{
            trashedTasks.push(task);
            addTaskInfo.splice(addTaskInfo.indexOf(task),1);

            general.innerHTML = '';
            general.appendChild(generalText);

            //re render geneal tasks

            generalTasks = addTaskInfo.filter(t => t.assign === "general" && !t.completed);
            generalTasks.forEach(t => {
                general.appendChild(createTaskElement(t)); // Recreate the task elements for remaining tasks
            });
            
        });        

        // Add an event listener to update the task's completed status
        checkmarkCheckbox.addEventListener('change', () => {
            if (checkmarkCheckbox.checked) {
                task.completed = true; // Mark task as completed
                console.log(`Task "${task.title}" completed: ${task.completed}`); // Log for debugging

                // Remove the task from the generalTasks array
                generalTasks = generalTasks.filter(t => t !== task);
                general.innerHTML = ''; // Clear the current display
                general.appendChild(generalText); // Re-add the header
                generalTasks.forEach(t => {
                    general.appendChild(createTaskElement(t)); // Recreate the task elements for remaining tasks
                });
            } else {
                task.completed = false; // Optionally handle unchecking
            }
        });

        // Append the checkbox and task details to the task element
        taskElement.appendChild(checkmarkCheckbox);
        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(dateElement);
        taskElement.appendChild(trashButton);
        general.appendChild(taskElement);
    });

    return general;
}

// Helper function to create a task element
function createTaskElement(task) {
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

    const checkmarkCheckbox = document.createElement('input');
    checkmarkCheckbox.setAttribute('type', 'checkbox');
    checkmarkCheckbox.checked = task.completed || false;

    

    taskElement.appendChild(checkmarkCheckbox);
    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(dateElement);

    return taskElement;
}
