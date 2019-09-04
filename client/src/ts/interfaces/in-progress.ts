import { TodoStatus } from './todo-status';
import { TaskProperties } from './task-properties';

export interface InProgress extends TaskProperties {
  state: TodoStatus.inProgress;
}