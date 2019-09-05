import { TodoStatus } from './interfaces/todo-status';

// TODO: tile -> JQuery, function -> return nothing
export function makeTileDraggable(tile) {
  tile.draggable({
    revert: 'invalid'
  });
}

// TODO: management -> TodoManagement
export function makeListDroppable(management) {
  // TODO: list -> JQuery, status -> string, function -> return JQuery
  return (list, status) => list.droppable({
    accept: (ui) => {
      switch (status) {
        case TodoStatus.toDo:
          return ui.parent().attr('id') === 'todo-list-todo';
        case TodoStatus.inProgress:
          return ui.parent().attr('id') === 'todo-list-in-progress';
        default:
          return false;
      }
    },
    drop: (event, ui) => {
      const todoTile = ui.draggable;
      const todoId = todoTile.attr('data-id');
      const todo = management.todoList.find(t => t.id === todoId);
      management.progressTodo(ui.draggable, todo);
    }
  });
}