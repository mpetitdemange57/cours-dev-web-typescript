import { TodoStatus } from './interfaces/todo-status';
import { makeListDroppable, makeTileDraggable } from './drag-drop';
import { AddModal } from './add-modal';
import { generateTodoTile } from './generate-todo-tile';
import { TodoService } from './todo-service';
import { Todo } from './interfaces/todo';
import { Task } from './interfaces/task';
import { Done } from './interfaces/done';

export class TodoManagement {

  todoList: Task[] = [];

  private readonly inProgressContainer: JQuery<HTMLElement> = $('#todo-list-in-progress');

  private toDoContainer: JQuery<HTMLElement> = $('#todo-list-todo');

  private readonly doneContainer: JQuery<HTMLElement> = $('#todo-list-done');

  constructor(private todoService: TodoService) {
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

  clearAll(): void {
    this.clearList(this.toDoContainer);
    this.clearList(this.inProgressContainer);
    this.clearList(this.doneContainer);
  }

  clearList(list: JQuery<HTMLElement>): void {
    list.find('.todo-tile').remove();
  }

  drawAll(): void {
    this.drawList(this.toDoContainer, TodoStatus.toDo);
    this.drawList(this.inProgressContainer, TodoStatus.inProgress);
    this.drawList(this.doneContainer, TodoStatus.done);
  }

  drawList(list: JQuery<HTMLElement>, state: TodoStatus): void {
    this.todoList
    .filter(todo => todo.state === state)
    .forEach(todo => {
      const todoTile: JQuery<HTMLElement> = generateTodoTile(this.todoService)(todo);
      makeTileDraggable(todoTile);
      list.append(todoTile);
    });
  }

  create(newTodoData: Todo): void {
    this.todoService.create(newTodoData)
      .then((response) => {
        const $todoTile = generateTodoTile(this.todoService)(response.data);
        makeTileDraggable($todoTile);
        this.todoList.push(response.data);
        this.toDoContainer.append($todoTile);
      });
  }

  progressTodo(todoTile: JQuery<HTMLElement>, todo: Exclude<Task, Done>): void {
    let listToAppend;
    let promise;
    switch (todo.state) {
      case TodoStatus.toDo:
        (todo as Task).state = TodoStatus.inProgress;
        listToAppend = this.inProgressContainer;
        promise = this.todoService.toInProgress(todo.id);
        break;
      case TodoStatus.inProgress:
        (todo as Task).state = TodoStatus.done;
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
