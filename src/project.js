import Task from "./task";

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(title, dueDate, description, priority, notes) {
        if (this.tasks.some(task => task.title === title)) return;
        this.tasks.push(new Task(title, dueDate, description, priority, notes));
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }
}