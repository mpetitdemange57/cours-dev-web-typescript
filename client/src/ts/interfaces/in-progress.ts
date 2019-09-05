import { TaskProperties } from './task-properties';

export interface InProgress extends TaskProperties {
  state: string;
}