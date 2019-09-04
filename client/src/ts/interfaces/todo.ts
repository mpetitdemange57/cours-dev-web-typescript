import { TodoStatus } from './todo-status';
import { TaskProperties } from './task-properties';

export interface Todo extends TaskProperties {
  state: TodoStatus.toDo;
}