import { projectTasks } from "./project.js";

export const addTaskInfo = [];
export const trashedTasks = [];

export default function loadAddTask() {
    const addTask = document.createElement('div');
    addTask.textContent = 'Add Task';
    addTask.style.fontSize = '20px';
    addTask.classList.add('addTask-button');

    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Close';
    closeButton.style.marginBottom = '10px';

    // Attach the close event only once
    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior if within form
        closeModal();
    });

    // Title input
    const title = document.createElement('input');
    title.setAttribute('placeholder', 'Title');
    title.setAttribute('type', 'text');
    title.setAttribute('id', 'taskTitle');
    title.classList.add('task-title');

    // Description input
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Description...');
    description.setAttribute('type', 'text');
    description.setAttribute('id', 'taskDescription');
    description.classList.add('task-description');

    // Date form and input
    const form = document.createElement('form');
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'date');
    dateLabel.textContent = "Due Date: ";

    const dateInput = document.createElement('input');
    dateInput.setAttribute('id', 'date');
    dateInput.setAttribute('name', 'dueDate');
    dateInput.setAttribute('type', 'date');

    // Assignment form and input
    const assignForm = document.createElement('form');
    const assignLabel = document.createElement('label');
    assignLabel.setAttribute('for', 'assignInput');
    assignLabel.textContent = "Assign: ";

    const assignInput = document.createElement('input');
    assignInput.setAttribute('type', 'text');
    assignInput.setAttribute('id', 'assignInput');
    assignInput.setAttribute('list', 'taskAssign');

    const dataList = document.createElement('datalist');
    dataList.setAttribute('id', 'taskAssign');

    
    function updateAssignOptions() {
        dataList.innerHTML = '';  // Clear any existing options
        let projectList = JSON.parse(localStorage.getItem("projectList")) || [];
        console.log('Project list from localStorage:', projectList); // Log for debugging

        const assignOptions = ["general", ...projectList.map(project => project.projectName)];



        assignOptions.forEach(assignText => {
            const option = document.createElement('option');
            option.value = assignText;
            dataList.appendChild(option);

        });

    }
    updateAssignOptions();


    
    

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        if (title.value.trim() === '') {
            alert('Task title is required'); // Alert if the task title is empty
            return; // Exit if there's no title
        }
        addTaskInfo.push({
            title: title.value,
            description: description.value,
            dueDate: dateInput.value,
            assign: assignInput.value,
            completed: false
        });
        console.log('task added: ', addTaskInfo); // test
        closeModal();
    });

    // Close modal function
    function closeModal() {
        modalOverlay.remove();
    }

    // Append elements
    assignForm.appendChild(assignLabel);
    assignForm.appendChild(assignInput);
    assignForm.appendChild(dataList);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(addTask);

    modalOverlay.appendChild(modalContent);

    form.appendChild(dateLabel);
    form.appendChild(dateInput);

    assignForm.appendChild(submitButton);

    addTask.appendChild(title);
    addTask.appendChild(description);
    addTask.appendChild(form);
    addTask.appendChild(assignForm);

    return modalOverlay;
}
