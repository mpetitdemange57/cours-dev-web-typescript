import { TaskProperties } from './task-properties';
import { TodoStatus } from './todo-status';

export interface Done extends TaskProperties {
  state: TodoStatus.done;
}