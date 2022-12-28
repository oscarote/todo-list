import TodoList from "./todoList";

// Load updated homepage
export default function loadHomePage() {
    showProjects();
    showTasks("Inbox");
    initAddButtons();
}

const todoList = new TodoList();
let currentProject = "Inbox";
// Create tasks for testing purpose
todoList.getCustomProject("Inbox").addTask("Hey");
todoList.projects[0].addTask("Bye");

// Show projects in the left sidebar, separating default projects from custom projects
const showProjects = () => {
    const defaultsDiv = document.querySelector(".defaults");
    const projectsDiv = document.querySelector(".projects");

    defaultsDiv.innerText = "";
    projectsDiv.innerText = "";

    todoList.projects.forEach(element => {
        const button = document.createElement("button");
        button.innerText = element.name;
        if (element.name === "Inbox" || element.name === "Today" || element.name === "This week") {
            defaultsDiv.appendChild(button);
        } else {
            projectsDiv.appendChild(button);
        }
        // Event listener for each project, calling function to load tasks from the clicked project
        button.addEventListener("click", () => {
            currentProject = element.name;
            showTasks(currentProject);
        });
    });
};

// Load tasks of a project
const showTasks = (project) => {
    const tasksDiv = document.querySelector(".tasks");
    const projectTitle = document.getElementById("projectTitle");
    const currentTasks = todoList.getCustomProject(project).tasks;

    projectTitle.innerText = project;
    tasksDiv.innerText = "";

    currentTasks.forEach(element => {
        const div = document.createElement("div");
        const circleSpan = document.createElement("span");
        const titleDiv = document.createElement("div");
        const priorityDiv = document.createElement("div");
        const dueDateDiv = document.createElement("div");
        const editSpan = document.createElement("span");
        const deleteSpan = document.createElement("span");

        div.classList.add("taskCard");
        div.dataset.task = element.title;
        circleSpan.classList.add("material-symbols-outlined");
        circleSpan.classList.add("custom-Radio");
        titleDiv.classList.add("taskTitle");
        priorityDiv.classList.add("taskPriority");
        dueDateDiv.classList.add("taskDueDate");
        editSpan.classList.add("material-symbols-outlined");
        editSpan.classList.add("custom-Radio");
        deleteSpan.classList.add("material-symbols-outlined");
        deleteSpan.classList.add("custom-Radio");

        circleSpan.innerText = "radio_button_unchecked";
        titleDiv.innerText = element.title;
        priorityDiv.innerText = element.priority;
        dueDateDiv.innerText = element.dueDate;
        if (element.dueDate === "") {
            dueDateDiv.innerText = "No Date";
        }
        editSpan.innerText = "edit";
        deleteSpan.innerText = "delete";

        div.appendChild(circleSpan);
        div.appendChild(titleDiv);
        div.appendChild(priorityDiv);
        div.appendChild(dueDateDiv);
        div.appendChild(editSpan);
        div.appendChild(deleteSpan);
        tasksDiv.appendChild(div);

        // Create div so task info can be accessed when title is clicked
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("showTaskInfo");

        const descriptionH4 = document.createElement("h4");
        descriptionH4.innerText = "Description";
        const description = document.createElement("p");
        description.innerText = element.description;
        const notesH4 = document.createElement("h4");
        notesH4.innerText = "Notes";
        const notes = document.createElement("p");
        notes.innerText = element.notes;

        infoDiv.appendChild(descriptionH4);
        infoDiv.appendChild(description);
        infoDiv.appendChild(notesH4);
        infoDiv.appendChild(notes);
        tasksDiv.appendChild(infoDiv);

        // Event listener to mark task as done or undone
        circleSpan.addEventListener("click", () => {
            element.toggleStatus();
            const taskCardDiv = document.querySelector(`[data-task="${element.title}"]`);
            if (element.status === "done") {
                circleSpan.innerText = "check_circle";
                taskCardDiv.classList.add("doneTask");
            } else {
                circleSpan.innerText = "radio_button_unchecked";
                taskCardDiv.classList.remove("doneTask");
            }
        });

        // Event listener to show task info when title clicked
        titleDiv.addEventListener("click", () => {
            infoDiv.classList.toggle("active");
        });

        // Event listener to open edit modal
        editSpan.addEventListener("click", () => openEditModal(element));

        //Event listener to delete task
        deleteSpan.addEventListener("click", () => {
            if (confirm(`Do you want to delete the task "${element.title}"`)) {
                todoList.getCustomProject(currentProject).removeTask(element);
                showTasks(currentProject);
            }
        });
    });
};

// Open a modal to edit tasks
const openEditModal = (task) => {
    const modal = document.getElementById("editTaskModal");
    const overlay = document.querySelector(".overlay");
    const editForm = document.getElementById("editTaskForm");
    const editTitle = document.getElementById("editTitle");
    const editPriority = document.getElementById("editPriority");
    const editDueDate = document.getElementById("editDueDate");
    const editDescription = document.getElementById("editDescription");
    const editNotes = document.getElementById("editNotes");

    editTitle.value = task.title;
    editPriority.value = task.priority;
    editDueDate.value = task.dueDate;
    editDescription.value = task.description;
    editNotes.value = task.notes;

    modal.classList.toggle("active");
    overlay.classList.toggle("active");

    editForm.addEventListener("submit", e => {
        e.preventDefault();
        task.title = editTitle.value;
        task.priority = editPriority.value;
        task.dueDate = editDueDate.value;
        task.description = editDescription.value;
        task.notes = editNotes.value;
        showTasks(currentProject);
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
};

// Initialize event listener for add buttons
const initAddButtons = () => {
    const addProjectBtn = document.querySelector(".addProject");
    const addTaskBtn = document.querySelector(".addTask");

    addProjectBtn.addEventListener("click", () => {
        displayProjectPopup();
        createProject();
    });

    addTaskBtn.addEventListener("click", () => {
        displayTaskPopup();
        createTask();
    });
};

// Display add project popup
const displayProjectPopup = () => {
    const addProjectPopup = document.querySelector(".addProjectPopup");
    const addProjectInput = document.getElementById("addProjectInput");
    addProjectInput.value = "";
    addProjectPopup.classList.toggle("active");
};

// Create project with the data of the input of the previous popup
const createProject = () => {
    const addBtn = document.querySelector(".addProjectBtn");
    const cancelBtn = document.querySelector(".cancelProjectBtn");
    const addProjectInput = document.getElementById("addProjectInput");

    addBtn.addEventListener("click", () => {
        if (addProjectInput.value === "") return;
        todoList.addProject(addProjectInput.value);
        displayProjectPopup();
        showProjects();
    });

    addProjectInput.addEventListener("keypress", e => {
        if (e.key !== "Enter" || addProjectInput.value === "") return;
        todoList.addProject(addProjectInput.value);
        displayProjectPopup();
        showProjects();
    })

    cancelBtn.addEventListener("click", displayProjectPopup);
};

// Display popup to add a task
const displayTaskPopup = () => {
    const addTaskPopup = document.querySelector(".addTaskPopup");
    addTaskPopup.classList.toggle("active");
};

// Create task from the previous popup
const createTask = () => {
    const addTaskForm = document.getElementById("addTaskForm");

    addTaskForm.addEventListener("submit", e => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const dueDate = document.getElementById("dueDate").value;
        const description = document.getElementById("description").value;
        const priority = document.getElementById("priority").value;
        const notes = document.getElementById("notes").value;

        todoList.getCustomProject(currentProject).addTask(title, dueDate, description, priority, notes);
        displayTaskPopup();
        showTasks(currentProject);

    })

    addTaskForm.addEventListener("reset", displayTaskPopup);
};