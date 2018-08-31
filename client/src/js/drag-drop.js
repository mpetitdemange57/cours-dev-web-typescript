import todoManagement from './todo-management';

export default {
	makeTileDraggable($tile) {
		$tile.draggable({
			revert: 'invalid'
		});
	},

	makeListDroppable($list, accept) {
		return $list.droppable({
			accept: (ui) => {
				switch (accept) {
					case 'toDo':
						return ui.parent().attr('id') === 'todo-list-todo';
					case 'inProgress':
						return ui.parent().attr('id') === 'todo-list-in-progress';
				}
				return false;
			},
			drop: (event, ui) => {
				const $todoTile = ui.draggable;
				const toDoId = $todoTile.attr('data-id');
				const toDo = todoManagement.toDoList.find(t => t.id === toDoId);
				todoManagement.progressTodo(ui.draggable, toDo);
			}
		});
	}
}