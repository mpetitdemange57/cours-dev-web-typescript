import { TaskProperties } from './task-properties';
import { TodoStatus } from './todo-status';

export interface InProgress extends TaskProperties {
  state: TodoStatus.inProgress;
}