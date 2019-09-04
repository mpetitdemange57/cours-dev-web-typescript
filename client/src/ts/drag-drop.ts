import { TodoManagement } from './todo-management';
import { TodoStatus } from './interfaces/todo-status';

export function makeTileDraggable(tile: any) {
  tile.draggable({
    revert: 'invalid'
  });
}

export function makeListDroppable(management: TodoManagement) {
  return (list: JQuery<HTMLElement>, status: TodoStatus) => list.droppable({
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
      const todoTile: JQuery<HTMLElement> = ui.draggable;
      const todoId = todoTile.attr('data-id');
      const todo = management.todoList.find(t => t.id === todoId);
      management.progressTodo(ui.draggable, todo);
    }
  });
}