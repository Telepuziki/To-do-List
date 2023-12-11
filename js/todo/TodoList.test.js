import {
  TodoList
} from './TodoList';
import {
  Todo
} from './Todo';
import {
  filterOptions,
  sortOptions
} from '../../utils/utils';

// Мокаем localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

describe('TodoList', () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
    global.localStorage.getItem.mockReturnValue(JSON.stringify([]));
  });

  it('Add task', () => {
    const content = 'New task';
    todoList.addTodo(content);
    expect(todoList.todos[0]).toBeInstanceOf(Todo);
    expect(todoList.todos[0].content).toBe(content);
  });

  it('Remove task', () => {
    const todo = new Todo('Task');
    todoList.todos.push(todo);
    todoList.removeTodo(todo.id);
    expect(todoList.todos).not.toContain(todo);
  });

  it('Switch status task', () => {
    const todo = new Todo('Task');
    todoList.todos.push(todo);
    todoList.toggleTodoCompleted(todo.id);
    expect(todo.completed).toBe(true);
  });

  it('Filter task', () => {
    const completedTodo = new Todo('Completed task');
    completedTodo.toggleCompleted();
    const activeTodo = new Todo('Active task');
    todoList.todos.push(completedTodo, activeTodo);
    expect(todoList.filterTodos(filterOptions.completed, todoList.todos)).toContain(completedTodo);
    expect(todoList.filterTodos(filterOptions.active, todoList.todos)).toContain(activeTodo);
  });

  it('Sort tasks', () => {
    const firstTodo = new Todo('First task');
    const secondTodo = new Todo('Second task');
    todoList.todos.push(firstTodo, secondTodo);
    const sortedByDate = todoList.sortTodos(sortOptions.date, todoList.todos);
    const sortedByContent = todoList.sortTodos(sortOptions.content, todoList.todos);
    expect(sortedByDate).toEqual(expect.arrayContaining([firstTodo, secondTodo]));
    expect(sortedByContent).toEqual(expect.arrayContaining([firstTodo, secondTodo]));
  });

  it('Save task', () => {
    todoList.save();
    expect(localStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(todoList.todos));
  });
});