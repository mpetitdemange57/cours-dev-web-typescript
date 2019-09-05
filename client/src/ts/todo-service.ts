export class TodoService {

  private apiUrl = 'http://localhost:9000/api';

  // TODO: function -> return JQuery.jqXHR of BackendResponse of Array of Todo
  findAll() {
    return $.ajax({
      url: `${this.apiUrl}/all`
    });
  }

  // TODO: function -> return JQuery.jqXHR of BackendResponse of Array of Task
  findMine() {
    return $.ajax({
      url: `${this.apiUrl}/my`
    });
  }

  // TODO: function -> return JQuery.jqXHR of void
  delete(id) {
    return $.ajax({
      method: 'DELETE',
      url: `${this.apiUrl}/my/${id}`
    });
  }

  // TODO: function -> return JQuery.jqXHR of void
  toInProgress(id) {
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/in-progress`
    });
  }

  // TODO: function -> return JQuery.jqXHR of void
  toDone(id){
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/done`
    });
  }

  // TODO: function -> return JQuery.jqXHR of BackendResponse of Todo
  create(task) {
    return $.ajax({
      method: 'PUT',
      data: task,
      url: `${this.apiUrl}/my/new`
    });
  }
}