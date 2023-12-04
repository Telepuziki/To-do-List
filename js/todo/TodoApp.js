import { TodoList } from "./TodoList.js";
import { classNames } from "../../utils/classNames.js";
import { UI } from "../UI.js";
import { filterOptions, sortOptions } from "../../utils/utils.js";


export class TodoApp {
    constructor(
        todoListElement,
        todoFormElement,
        todoInputElement,
        todosFilterElement,
        todosSortElement,
    ) {
        this.todoListElement = todoListElement;
        this.todoFormElement = todoFormElement;
        this.todoInputElement = todoInputElement;
        this.todosFilterElement = todosFilterElement;
        this.todosSortElement = todosSortElement;
    }

    init() {
        UI.setOptions(this.todosFilterElement, filterOptions);
        UI.setOptions(this.todosSortElement, sortOptions);
        this.filter = filterOptions.all;
        this.sort = sortOptions.default;
        this.todoList = new TodoList();
        this.todoFormElement.addEventListener('submit', this.handleSubmit.bind(this));
        this.todoListElement.addEventListener('click', this.handleListClick.bind(this));
        this.todosFilterElement.addEventListener('change', this.handleFilterChange.bind(this));
        this.todosSortElement.addEventListener('change', this.handleSortChange.bind(this));
        this.render();
    }

    handleFilterChange(event) {
        this.filter = event.target.value;
        this.render();
    }

    handleSortChange(event) {
        this.sort = event.target.value;
        this.render();
    }

    handleListClick(event) {
        const target = event.target;
        const todoId = +target.parentElement.dataset.id;
        if (target.classList.contains(classNames.REMOVE_BTN)) {
            this.todoList.removeTodo(todoId);
        } else if (target.classList.contains(classNames.TOGGLE_BTN)) {
            this.todoList.toggleTodoCompleted(todoId);
        }
        this.render();
    }

    handleSubmit(event) {
        event.preventDefault();
        const todoContent = this.todoInputElement.value.trim();
        if (!todoContent) return;
        this.todoList.addTodo(todoContent);
        this.todoInputElement.value = '';
        this.render();
    }

    render() {
        this.todoListElement.innerHTML = '';
        const todosArr = this.todoList.getTodos(this.filter, this.sort);
        UI.fillTodoList(this.todoListElement, todosArr);
    }
}