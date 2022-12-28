import Project from "./project";

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Inbox"));
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("This week"));
    }

    addProject(newProject) {
        if (this.projects.some((project) => project.name === newProject)) return;
        this.projects.push(new Project(newProject));
    }

    getCustomProject(project) {
        let customProject = {};
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].name === project) {
                customProject = this.projects[i];
            }
        }
        return customProject;
    }
}