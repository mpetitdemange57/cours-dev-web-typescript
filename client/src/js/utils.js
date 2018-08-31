import todoService from "./todo-service";

export default {
	generateTodoTile(todo) {
		const $todoTile = $(`<div class="todo-tile shadow rounded border ${todo.type}" data-id="${todo.id}"></div>`);
		const $todoTitle = $(`<div class="todo-title">${todo.title}</div>`);
		let imgPath;
		if (todo.type === 'sfeir-school') {
			imgPath = `asset/badges/${todo.type}/badge-${todo.title.toLowerCase()}.png`;
		} else {
			imgPath = `asset/badges/${todo.type}/${todo.title.toUpperCase()}.png`;
		}
		const $todoImg = $(`<div class="todo-img-container"><img class="todo-img" src="${imgPath}"></div>`);
		$todoTile.append($todoImg).append($todoTitle);
		if (todo.id) {
			const $todoClose = $('<div class="todo-close">&times;</div>').on('click', () => {
				todoService.delete(todo.id)
					.then(() => {
						$todoTile.remove();
					});
			});
			$todoTile.append($todoClose);
		}

		return $todoTile;
	},
}