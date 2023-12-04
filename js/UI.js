import {classNames} from "../utils/classNames.js";
import {createElement} from "../utils/utils.js";

export class UI {

    static getToggleBtn(completed) {
        const text = completed ? 'completed' : 'not completed';
        const toggleBtnClasses = [
            classNames.BUTTON,
            classNames.TOGGLE_BTN
        ];
        if (completed) {
            toggleBtnClasses.push(classNames.PRIMARY_BUTTON);
        } else {
            toggleBtnClasses.push(classNames.DANGER_BUTTON);
        }
        return createElement(
            'button',
            toggleBtnClasses.join(" "),
            text,
        );
    }

    static getRemoveBtn() {
        const removeBtnClasses = [
            classNames.BUTTON,
            classNames.DANGER_BUTTON,
            classNames.REMOVE_BTN
        ];
        return createElement(
            'button',
            removeBtnClasses.join(" "),
            'remove',
        );
    }

    static getTodoElement(todo) {
        const removeTodoBtn = this.getRemoveBtn();
        const toggleTodoBtn = this.getToggleBtn(todo.completed);
        const todoElementClasses = [
            classNames.TODO_ITEM,
            classNames.COLUMN_FLEX,
            classNames.BORDERED_BLOCK
        ];
        const createdSpan = createElement(
            'span',
            undefined,
            todo.getTodoCreated(),
        );
        const todoElement = createElement(
            'li',
            todoElementClasses.join(" "),
            todo.content,
            {"data-id": todo.id}
        );

        todoElement.append(removeTodoBtn, toggleTodoBtn,  createdSpan);
        return todoElement;
    }

    static fillTodoList(todoListElement, todosArr) {
        todosArr.forEach(todo =>  {
            const todoElement = this.getTodoElement(todo);
            todoListElement.appendChild(todoElement);
        });
    }

    static setOptions(element, options) {
        const optionsArr = Object.keys(options);
        optionsArr.forEach(option => {
            const optionElement = createElement(
                "option",
                undefined,
                option,
                {"value":  options[option]},
            );
            element.appendChild(optionElement);
        });
    }
}