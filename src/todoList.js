import Task from "./task";
import Project from "./project";

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Inbox"));
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    addProject(newProject) {
        if (this.projects.find((project) => project.name === newProject)) return;
        this.projects.push(newProject);
    } 
}