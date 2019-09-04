import { Todo } from './todo';
import { InProgress } from './in-progress';
import { Done } from './done';

export type Task = Todo | InProgress | Done;