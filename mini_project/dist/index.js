"use strict";
const todos = readTodos();
const btn = document.getElementById('btn');
const input = document.getElementById('todoinput');
const form = document.querySelector('form');
const list = document.getElementById('todolist');
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null) {
        return [];
    }
    else {
        return JSON.parse(todosJSON);
    }
}
todos.forEach(todo => {
    createTodo(todo);
});
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
const handleSubmit = (e) => {
    e.preventDefault();
    if (input.value !== '') {
        const newTodo = {
            text: input.value,
            completed: false
        };
        createTodo(newTodo);
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        input.value = '';
    }
};
function createTodo(todo) {
    const newLi = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = todo.completed;
    checkBox.addEventListener('change', function () {
        todo.completed = checkBox.checked;
        console.log(todo.completed);
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkBox);
    list.append(newLi);
    return newLi;
}
form.addEventListener('submit', handleSubmit);
