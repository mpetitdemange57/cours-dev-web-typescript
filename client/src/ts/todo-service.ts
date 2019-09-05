export class TodoService {

  private apiUrl = 'http://localhost:9000/api';

  findAll() {
    return $.ajax({
      url: `${this.apiUrl}/all`
    });
  }

  findMine() {
    return $.ajax({
      url: `${this.apiUrl}/my`
    });
  }

  delete(id) {
    return $.ajax({
      method: 'DELETE',
      url: `${this.apiUrl}/my/${id}`
    });
  }

  toInProgress(id) {
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/in-progress`
    });
  }

  toDone(id){
    return $.ajax({
      method: 'PUT',
      url: `${this.apiUrl}/my/${id}/done`
    });
  }

  create(task) {
    return $.ajax({
      method: 'PUT',
      data: task,
      url: `${this.apiUrl}/my/new`
    });
  }
}