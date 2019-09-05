import { TodoStatus } from './interfaces/todo-status';

export function makeTileDraggable(tile) {
  tile.draggable({
    revert: 'invalid'
  });
}

export function makeListDroppable(management) {
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