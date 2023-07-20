const createTaskHTML = (taskName, assignedTo, taskDescription, statusUpdate, dueDate, taskId) => {
    const html = `
    <div class="col-md-4 left-side text-center left-side" data-task-id = "${taskId}">
        <div>
            <dl>
                <dt>Task Name: ${taskName}</dt>
                <dt>Assigned To: ${assignedTo}</dt>
                <dt>Task Description: ${taskDescription}</dt>
                <dt>Status Update: ${statusUpdate}</dt>
                <dt>Due Date: ${dueDate}</dt>
            </dl>
        </div>

        <!--Mark As Done Button -->
        <div class = "mb-3">
            <button class = "done-button">Mark As Done</button>
        </div>

        <!--Delete Button -->
        <div class = "mb-3">
            <button class = "delete-button">Delete Task</button>
        </div>
    </div>
    `;

    return html;
}

class TaskManager {
    constructor(currentId = 0){
        this.tasks = [];
        this.currentId = currentId;
    }

    // A method to add task programmatically
    addTask(taskName,assignedTo, taskDescription,  statusUpdate = "To Do", dueDate){
        this.currentId++;
        const task = {
            id: this.currentId,
            taskName,
            assignedTo,
            taskDescription,
            statusUpdate,
            dueDate
        };
        //push a new task into the this.tasks array
        this.tasks.push(task);
    }
    
    render() {
        // Array to hold the HTML of all the tasks
        const taskHtmlList = [];
    
        // Loop through each task and generate task HTML
        for (const task of this.tasks) {
        const formattedDate = task.dueDate;
        const taskHtml = createTaskHTML(
            task.taskName,
            task.assignedTo,
            task.taskDescription,
            task.statusUpdate,
            formattedDate, // uses the task's dueDate directly
            task.id // added taskId as an argument to createTaskHTML
        );
    
        taskHtmlList.push(taskHtml); // Add task HTML to the array
        }
    
        const tasksHtml = taskHtmlList.join('\n');
        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = tasksHtml; // Render all tasks at once
    }
    
    getTaskById(taskId){
        return this.tasks.find((task) => task.id === taskId)
    }

    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks',tasksJson);

        const currentIdString = this.currentId.toString();
        localStorage.setItem('currentId', currentIdString)
    }

    load(){
        const tasksJson = localStorage.getItem('tasks');
        if(tasksJson){
            this.tasks = JSON.parse(tasksJson);
        }

        const currentIdString = localStorage.getItem('currentId');
        if (currentIdString){
            this.currentId = parseInt(currentIdString, 10);
        }
    }

    deleteTask(taskId){
        const newTasks = [];

        for(const task of this.tasks){
            if (task.id !== taskId){
                newTasks.push(task);
            }
        }

        this.tasks = newTasks;
    }
};
