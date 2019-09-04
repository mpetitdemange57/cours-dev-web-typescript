import { Task } from './interfaces/task';
import { BackendResponse } from './interfaces/backend-response';
import jqXHR = JQuery.jqXHR;
import { Todo } from './interfaces/todo';

export class TodoService {

  private apiUrl = 'http://localhost:9000/api';

  findAll(): jqXHR<BackendResponse<Todo[]>> {
    return $.ajax({
      url: `${this.apiUrl}/all`
    });
  }

  findMine(): jqXHR<BackendResponse<Task[]>> {
    return $.ajax({
      url: `${this.apiUrl}/my`
    });
  }

  delete(id: string): jqXHR<void> {
    return $.ajax({
      method: 'DELETE',
      url: `${this.apiUrl}/my/${id}`
    });
  }

  toInProgress(id: string): jqXHR<void> {
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/in-progress`
    });
  }

  toDone(id: string): jqXHR<void> {
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/done`
    });
  }

  create(task: Task): jqXHR<BackendResponse<Todo>> {
    return $.ajax({
      method: 'PUT',
      data: task,
      url: `${this.apiUrl}/my/new`
    });
  }
}