
import { addTaskInfo, trashedTasks } from "./addTask";
export const projectTasks = [];

const projectButtonContainer = document.getElementById('project-button-container'); // Adjust as needed

// project.js or wherever you're managing project creation
let projectList = JSON.parse(localStorage.getItem('projectList')) || [];

// Function to add a new project
export function addNewProject(projectName) {
    if(projectList.length >= 3){
        alert('you can only create 3 projects.')
        return;
    }

    projectList.push({ projectName });
    localStorage.setItem('projectList', JSON.stringify(projectList));
    console.log('Project added and saved:', projectList);
    
}


export default function loadProject(){
    let projectNames = JSON.parse(localStorage.getItem('projectList'))?.map(project => project.projectName) || [];
    let projectTasks = addTaskInfo.filter(task => projectNames.includes(task.assign) && !task.completed);
    console.log(projectTasks);
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content-project');
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button-project');
    closeButton.textContent = 'Exit';
    

    // Attach the close event only once
    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior if within form
        console.log('close')
        closeModal();
    });
    


    const project = document.createElement('div');
    const projectTitle = document.createElement('input');
    projectTitle.setAttribute('placeholder', 'Project Name: ');
    projectTitle.setAttribute('type', 'text');
    projectTitle.setAttribute('id', 'projectTitle');
    projectTitle.classList.add('project-title');
    projectTitle.setAttribute('maxlength', '20');


    function closeModal() {
        modalOverlay.remove();
    }

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button-project');
    submitButton.textContent = 'Add';
    submitButton.style.backgroundColor = '#6BF216'
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        const newProjectName = projectTitle.value;
        console.log('add')


        const errorMessage = modalContent.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        if (!newProjectName) {
            const error = document.createElement('div');
            error.textContent = 'Project Name is required';
            error.classList.add('error-message'); // Add a class for styling if needed
            error.style.color = 'red'; // Optional: Style the error message
            modalContent.appendChild(error); // Append the error message to modal content
            return; // Exit the function if the input is empty
        }
        addNewProject(newProjectName)

        
        const projectButton = document.createElement('button');
        projectButton.textContent = newProjectName;
        projectButton.classList.add('project-button')
        projectButtonContainer.appendChild(projectButton);

        projectButton.addEventListener('click', ()=>{
            loadProjectTasks(newProjectName);
        })


        projectTitle.value = '';
        closeModal();

    });


    
    


    modalContent.appendChild(closeButton);
    modalContent.appendChild(submitButton)

    project.appendChild(projectTitle);
    modalOverlay.appendChild(modalContent);
    modalContent.appendChild(project);


    return modalOverlay;
}

function loadProjectTasks(projectName){
    let projectTasks = addTaskInfo.filter(task => task.assign === projectName && !task.completed);
    const projectSection = document.createElement('div');
    projectSection.classList.add('project-section');

    const projectHeader = document.createElement('h1');
    projectHeader.textContent = `${projectName} Tasks`;
    projectSection.appendChild(projectHeader);

    projectTasks.forEach((task) => {
        const taskElement = createTaskElement(task);
        projectSection.appendChild(taskElement);
    });

    // Clear existing project content and display the new tasks
    const mainContainer = document.getElementById('content'); // Assuming you have a container to hold tasks
    mainContainer.innerHTML = ''; // Clear existing content
    mainContainer.appendChild(projectSection);

}

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

    // Add event listener for checkbox to update completion status
    checkmarkCheckbox.addEventListener('change', () => {
        task.completed = checkmarkCheckbox.checked;
        console.log(`Task "${task.title}" completed: ${task.completed}`);

        // Re-render tasks after completion status change
        loadProjectTasks(task.assign); // Refresh the task list for the current project
    });

    const trashButton = document.createElement('button');
    trashButton.textContent = 'Trash';
    trashButton.classList.add('trash-button');

    trashButton.addEventListener('click', () => {
        trashedTasks.push(task);
        const taskIndex = addTaskInfo.indexOf(task);
        if (taskIndex > -1) {
            addTaskInfo.splice(taskIndex, 1);
        }
        loadProjectTasks(task.assign);
    });
   

    taskElement.appendChild(trashButton);


    // Append task details to task element
    taskElement.appendChild(checkmarkCheckbox);
    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(dateElement);

    return taskElement;
}

window.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    projectList = [];
    projectList = JSON.parse(localStorage.getItem('projectList')) || [];

    projectList.forEach(project => {
        const projectButton = document.createElement('button');
        projectButton.textContent = project.projectName;
        projectButton.classList.add('project-button');
        projectButtonContainer.appendChild(projectButton);

        projectButton.addEventListener('click',()=>{
            loadProjectTasks(project.projectName);
        })
    });

});