
//add task:
//have a title with a description
//be able to add date
//be able to asign it to general or one of
//the projects you have created

//general
//diplays the tasks
//the tasks in general show the assigned date
//have checkmark to comfirm if "completed" task
//if task is TODAY's date, mark as important or 'red'
//have an edit button to be able to change the task
//have a delete button which brings it into the trash

//completed
//displays completed tasks
//have the ability to simply remove the task which brings into the trash
//and have the abiliy to "uncheck" the completion which brings it back into to do tasks

//trash
//displays trashed tasks
//be able to restore the trash items
//be able to comletely remove the trash item(no longer can access)

//project
//displays project created
//the task you add is given an option to put it into projects
//this task

import loadAddTask from './addTask.js';
import loadGeneral from './general.js';
import loadCompleted from './completed.js';
import loadTrash from './trash.js';
import loadProject from './project.js';
import './styles.css';

document.addEventListener('DOMContentLoaded',() =>{
    console.log("DOM fully loaded and parsed");
    const content = document.getElementById('content');

    const addTaskButton = document.getElementById('addTask')
    const generalButton = document.getElementById('general')
    const completedButton = document.getElementById('completed')
    const trashButton = document.getElementById('trash')

    const projectButton = document.getElementById('project');


    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {

            content.innerHTML = '';

            console.log('add task');

            // Check if a modal is already open
            if (!document.querySelector('.modal-overlay')) {
                const modalOverlay = loadAddTask();
                content.appendChild(modalOverlay);

                // Attach close event to the close button within the modal
                const closeButton = modalOverlay.querySelector('.close-button');
                closeButton.addEventListener('click', () => {
                    modalOverlay.remove();

                });
            }
            content.appendChild(loadGeneral());


        });
    }
    if(generalButton){
        generalButton.addEventListener('click',()=>{
            console.log('general');
            content.innerHTML = '';
            content.appendChild(loadGeneral());
        });
    }
    if(completedButton){
        completedButton.addEventListener('click',()=>{
            console.log('completed');
            content.innerHTML = '';
            content.appendChild(loadCompleted());
        });
    }
    if(trashButton){
        trashButton.addEventListener('click',()=>{
            console.log('trash');
            content.innerHTML = '';
            content.appendChild(loadTrash());
        });
    }
    if(projectButton){
        projectButton.addEventListener('click',()=>{
            console.log('project');
            content.innerHTML = '';
            content.appendChild(loadProject());
        });
    }



})

