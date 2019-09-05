import { TaskProperties } from './task-properties';

export interface Todo extends TaskProperties {
  state: string;
}