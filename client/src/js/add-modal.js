import todoService from './todo-service';
import utils from './utils';

export default {
	selected: null,

	todoList: $('#new-todo-list'),

	$modal: $('#modal-add'),

	open() {
		return new Promise((resolve) => {
			this.$modal.on('hidden.bs.modal', () => {
				this.clear();
			});

			$('#modal-add-button').on('click', () => {
				this.$modal.modal('hide');
				resolve(this.selected);
			});

			this.$modal.modal({
					backdrop: 'static'
				}
			);

			this.populate();
		});
	},

	populate() {
		todoService.findAll()
			.then(toDoList => {
				toDoList.forEach(todo => {
					const $tile = utils.generateTodoTile(todo);
					$tile.click(() => {
						this.todoList.find('.todo-tile').removeClass('selected');
						$tile.addClass('selected');
						this.selected = todo;
					});
					this.todoList.append($tile);
				});
			});
	},

	clear() {
		this.todoList.find('.todo-tile').remove();
		this.$modal.off('hidden.bs.modal');
		$('#modal-add-button').off('click');
	}
}