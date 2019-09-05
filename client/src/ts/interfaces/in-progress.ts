import { TaskProperties } from './task-properties';

export interface InProgress extends TaskProperties {
  // TODO: use TodoStatus
  state: string;
}