export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTasks() {
        return this.tasks;
    }

    addTask(newTask) {
        if (this.tasks.find((task) => task.getName() === newTask.name)) return;
        this.tasks.push(newTask);
    }
}