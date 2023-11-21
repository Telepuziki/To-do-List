import { TodoApp } from "./TodoApp.js";

const todoForm  = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-content-input");
const todoList = document.getElementById("todo-list");
const todosFilter = document.getElementById("todos-filter");
const todosSort  = document.getElementById("todos-sort");

window.addEventListener("load", () => {
    const app = new TodoApp(todoList, todoForm, todoInput, todosFilter, todosSort);
    app.init();
});