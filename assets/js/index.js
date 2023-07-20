// import { TaskManager } from "./taskManager.js";
// import { createTaskHTML } from "./taskManager.js";

//TEST CODE! initialize a new instance of 'TaskManager'
const taskManager = new TaskManager();
// taskManager.addTask('Take out the trash', 'Take out the trash to the front of the house', 'Betiel', '2244-11-11')
// taskManager.addTask('Take out the trash', 'Take out the trash to the front of the house', 'Betiel', '2244-11-11')
console.log(taskManager.tasks); //task id increment test passed!

//Test Code!
// const taskHTML = createTaskHTML('laundry',  'put the white clothes first', 'Betiel','20/02/2020' );
// console.log(taskHTML);




//JavaScript Form Validation
const taskNameInput = document.getElementById('taskName');
const assignedToInput = document.getElementById('assignedTo');
const taskDescriptionInput = document.getElementById('taskDescription');
const dueDateInput = document.getElementById('dueDate');
const statusUpdateInput = document.getElementById('statusUpdate');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');
//catch erros before they are submitted

form.addEventListener('submit' ,  (e) => {
    e.preventDefault()
    

    //Initialize the messages array
    const messages = [];

    if (taskNameInput.value === '' || taskNameInput.value == null){
        messages.push('Please enter task name!')
    } // this means the user didn't pass in any input

    if (assignedToInput.value === '' || assignedToInput.value == null){
        messages.push('Please assign a task!')
    } // this means the user didn't pass in any input

    if (taskDescriptionInput.value === '' || taskDescriptionInput.value == null){
        messages.push('Please enter task description!')
    } // this means the user didn't pass in any input

    if (statusUpdateInput.value === '' || statusUpdateInput.value == null){
        messages.push('Please enter the status update for the task!')
    } // this means the user didn't pass in any input

    if (dueDateInput.value === '' || dueDateInput.value == null){
        messages.push('Please enter the due date for the task!')
    } // this means the user didn't pass in any input


    if (messages.length > 0) {

        errorElement.innerText = messages.join(' ')
        errorElement.style.display = 'block'; //shows the alert
    } else {
        errorElement.style.display = 'none'; // hides the alert if no errors
        taskManager.addTask(taskNameInput.value, assignedToInput.value, taskDescriptionInput.value, statusUpdateInput.value, dueDateInput.value)
        taskManager.save();
        taskManager.render();
    }
    
    taskNameInput.value = '';
    assignedToInput.value = '';
    taskDescriptionInput.value = '';
    statusUpdateInput.value = '';
    dueDateInput.value = '';
});

// Adding an Event Listener to the "Mark As Done" buttons
const taskList = document.getElementById('tasksList');

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('done-button')) {
            const taskCard = event.target.closest('.left-side');
            const taskId = parseInt(taskCard.dataset.taskId, 10);
            const task = taskManager.getTaskById(taskId);
            if (task) {
                task.statusUpdate = 'Done';
                taskManager.save();
                taskManager.render();
            }
        }

        if (event.target.classList.contains('delete-button')) {
            const parentTask = event.target.closest('.left-side');
            const taskId = parseInt(parentTask.dataset.taskId, 10);
            taskManager.deleteTask(taskId);
            taskManager.save();
            taskManager.render();
        }
    }
);

taskManager.load();
taskManager.render();