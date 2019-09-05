import { TaskProperties } from './task-properties';

export interface Todo extends TaskProperties {
  // TODO: use TodoStatus
  state: string;
}