import { Todo } from "./Todo.js";
import { filterOptions, sortOptions } from "./utils/utils.js";

export class TodoList {
    constructor() {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos = storedTodos.map(({ completed, content, id }) => {
            return new Todo(content, id, completed);
        });
    }

    addTodo(content) {
        this.todos.unshift(new Todo(content));
        this.save();
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        this.save();
    }

    toggleTodoCompleted(todoId) {
        const todo = this.todos.find(todo => todo.id === todoId);
        if (!todo) return;
        todo.toggleCompleted();
        this.save();
    }

    filterTodos(option, todos) {
        if (option === filterOptions.completed) {
            return todos.filter(todo => todo.completed);
        } else if (option === filterOptions.active) {
            return todos.filter(todo => !todo.completed);
        }
        return todos;
    }

    sortTodos(sort, todos) {
        if (sort === sortOptions.date) {
            return todos.sort((a, b) => a.id - b.id);
        }
        if (sort === sortOptions.content) {
            return todos.sort((a, b) => {
                if (a.content.length < b.content.length) return -1;
                if (a.content.length > b.content.length) return 1;
                return 0;
            });
        }
        return todos;
    }

    getTodos(filter, sort) {
        const filteredTodos = this.filterTodos(filter, this.todos);
        return this.sortTodos(sort, filteredTodos);
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}