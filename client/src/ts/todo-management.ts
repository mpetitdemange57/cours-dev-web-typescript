import { TodoStatus } from './interfaces/todo-status';
import { makeListDroppable, makeTileDraggable } from './drag-drop';
import { AddModal } from './add-modal';
import { generateTodoTile } from './generate-todo-tile';

export class TodoManagement {
  todoList = [];

  // TODO: JQuery
  private readonly inProgressContainer = $('#todo-list-in-progress');

  // TODO: JQuery
  private toDoContainer = $('#todo-list-todo');

  // TODO: JQuery
  private readonly doneContainer = $('#todo-list-done');

  // TODO: todoService -> TodoService
  constructor(private todoService) {
    todoService.findMine().then(response => {
      this.todoList = response.data;
      this.clearAll();
      this.drawAll();
    });

    const listDroppable = makeListDroppable(this);

    this.inProgressContainer = listDroppable(this.inProgressContainer, TodoStatus.toDo);
    this.doneContainer = listDroppable(this.doneContainer, TodoStatus.inProgress);

    $('#add-button').on('click', () => {
      new AddModal(this.todoService).open().then(todo => {
        this.create(todo)
      })
    })
  }

  // TODO: function -> return nothing
  clearAll() {
    this.clearList(this.toDoContainer);
    this.clearList(this.inProgressContainer);
    this.clearList(this.doneContainer);
  }

  // TODO: list -> JQuery, function -> return nothing
  clearList(list) {
    list.find('.todo-tile').remove();
  }

  // TODO: function -> return nothing
  drawAll() {
    this.drawList(this.toDoContainer, TodoStatus.toDo);
    this.drawList(this.inProgressContainer, TodoStatus.inProgress);
    this.drawList(this.doneContainer, TodoStatus.done);
  }

  // TODO: list: JQuery, state -> string, function -> return nothing
  drawList(list, state) {
    this.todoList
    .filter(todo => todo.state === state)
    .forEach(todo => {
      const todoTile: JQuery<HTMLElement> = generateTodoTile(this.todoService)(todo);
      makeTileDraggable(todoTile);
      list.append(todoTile);
    });
  }

  // TODO: newTodoData -> Todo, function -> return nothing
  create(newTodoData) {
    this.todoService.create(newTodoData)
      .then((response) => {
        const $todoTile = generateTodoTile(this.todoService)(response.data);
        makeTileDraggable($todoTile);
        this.todoList.push(response.data);
        this.toDoContainer.append($todoTile);
      });
  }

  // TODO: todoTile: JQuery, function -> return nothing (todo typed later)
  progressTodo(todoTile, todo) {
    let listToAppend;
    let promise;
    switch (todo.state) {
      case TodoStatus.toDo:
        todo.state = TodoStatus.inProgress;
        listToAppend = this.inProgressContainer;
        promise = this.todoService.toInProgress(todo.id);
        break;
      case TodoStatus.inProgress:
        todo.state = TodoStatus.done;
        listToAppend = this.doneContainer;
        promise = this.todoService.toDone(todo.id);
        break;
      default:
        throw new Error('Unable to progress the task.');
    }
    promise.then(() => {
      listToAppend.append(todoTile.detach().removeAttr('style'));
    });
  }
}