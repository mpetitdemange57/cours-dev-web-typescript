import { BackendResponse } from './interfaces/backend-response';
import { Todo } from './interfaces/todo';
import { Task } from './interfaces/task';

export class TodoService {

  private apiUrl = 'http://localhost:9000/api';

  findAll(): JQuery.jqXHR<BackendResponse<Todo[]>> {
    return $.ajax({
      url: `${this.apiUrl}/all`
    });
  }

  findMine(): JQuery.jqXHR<BackendResponse<Task[]>> {
    return $.ajax({
      url: `${this.apiUrl}/my`
    });
  }

  delete(id: string): JQuery.jqXHR<void> {
    return $.ajax({
      method: 'DELETE',
      url: `${this.apiUrl}/my/${id}`
    });
  }

  toInProgress(id: string): JQuery.jqXHR<void> {
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/in-progress`
    });
  }

  toDone(id: string): JQuery.jqXHR<void> {
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/done`
    });
  }

  create(task: Task): JQuery.jqXHR<BackendResponse<Todo>> {
    return $.ajax({
      method: 'PUT',
      data: task,
      url: `${this.apiUrl}/my/new`
    });
  }
}