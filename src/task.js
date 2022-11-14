export default class Task {
    constructor(title, dueDate = "No date", description, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title
    }

    setDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDate() {
        return this.dueDate;
    }

} 