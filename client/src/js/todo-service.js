const apiUrl = 'http://localhost:9000/api';

export default {
	findAll() {
		return $.ajax({
			url: `${apiUrl}/all`
		});
	},
	findMine() {
		return $.ajax({
			url: `${apiUrl}/my`
		});
	},
	delete(id) {
		return $.ajax({
			method: 'DELETE',
			url: `${apiUrl}/my/${id}`
		});
	},
	toInProgress(id) {
		return $.ajax({
			method: 'PUT',
			url: `${apiUrl}/my/${id}/in-progress`
		});
	},
	toDone(id) {
		return $.ajax({
			method: 'PUT',
			url: `${apiUrl}/my/${id}/done`
		});
	},
	create(todo) {
		return $.ajax({
			method: 'PUT',
			data: todo,
			url: `${apiUrl}/my/new`
		});
	}
};