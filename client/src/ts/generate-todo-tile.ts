import { TodoService } from './todo-service';
import { TaskProperties } from './interfaces/task-properties';

export function generateTodoTile(todoService: TodoService) {
  return (todo: TaskProperties): JQuery => {
    const $todoTile = $(`<div class="todo-tile shadow rounded border ${todo.type}" data-id="${todo.id}"></div>`);
    const $todoTitle = $(`<div class="todo-title"><b>${todo.title}</b></div>`);
    let imgPath;
    if (todo.type === 'sfeir-school') {
      imgPath = `asset/badges/${todo.type}/badge-${todo.title.toLowerCase()}.png`;
    } else {
      imgPath = `asset/badges/${todo.type}/${todo.title.toUpperCase()}.png`;
    }
    const $todoImg = $(`<div class="todo-img-container"><img class="todo-img" src="${imgPath}"></div>`);
    $todoTile.append($todoImg).append($todoTitle);
    if (todo.owner) {
      const todoOwner = $(`<div class="todo-owner">${todo.owner}</div>`);
      $todoTile.append(todoOwner);
    }
    if (todo.dueDate) {
      const todoDueDate = $(`<div class="todo-due-date"><i>${new Date(todo.dueDate).toDateString()}</i></div>`);
      $todoTile.append(todoDueDate);
    }
    if (todo.id) {
      const $todoClose = $('<div class="todo-close">&times;</div>').on('click', () => {
        todoService.delete(todo.id)
        .then(() => {
          $todoTile.remove();
        });
      });
      $todoTile.append($todoClose);
    }

    return $todoTile;
  }
}