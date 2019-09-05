import { TaskProperties } from './task-properties';

export interface Done extends TaskProperties {
  // TODO: use TodoStatus
  state: string;
}