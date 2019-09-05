import { TaskProperties } from './task-properties';
import { TodoStatus } from './todo-status';

export interface Todo extends TaskProperties {
  state: TodoStatus.toDo;
}