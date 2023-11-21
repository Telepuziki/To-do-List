export class Todo {
    constructor(content, id=Date.now(), completed=false) {
        this.content = content;
        this.completed = completed;
        this.id = id;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    getTodoCreated() {
        const date = new Date(this.id);
        return date.toLocaleString();
    }
}