export default class Task {
    constructor(title, dueDate = "", description = "", priority = "Low", notes = "", status = "notDone") {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.status = status;
    }

    toggleStatus() {
        if (this.status === "done") {
            this.status = "notDone"
        } else {
            this.status = "done";
        }
    }
} 