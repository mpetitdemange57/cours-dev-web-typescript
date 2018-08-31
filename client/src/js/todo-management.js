import todoService from './todo-service';
import dragDrop from './drag-drop';
import addModal from './add-modal';
import utils from './utils';

export default {
	toDoList: [],

	inProgressContainer: $('#todo-list-in-progress'),

	toDoContainer: $('#todo-list-todo'),

	doneContainer: $('#todo-list-done'),

	init() {
		// Get the data from the server and draw
		todoService.findMine().then(data => {
			this.toDoList = data;
			this.clearAll();
			this.drawAll();
		});

		// add drag & drop behavior for the different lists
		this.inProgressContainer = dragDrop.makeListDroppable($('#todo-list-in-progress'), 'toDo');
		this.doneContainer = dragDrop.makeListDroppable($('#todo-list-done'), 'inProgress');

		//Bind the add button to the opening of the modal
		$('#add-button').click(() => {
			addModal.open()
				.then(data => {
					this.create(data);
				});
		})

		//Bind the add selected button in the modal to create a new todo
	},

	clearAll() {
		this.clearList(this.toDoContainer);
		this.clearList(this.inProgressContainer);
		this.clearList(this.doneContainer);
	},

	clearList($list) {
		$list.find('.todo-tile').remove();
	},

	drawAll() {
		this.drawList(this.toDoContainer, 'toDo');
		this.drawList(this.inProgressContainer, 'inProgress');
		this.drawList(this.doneContainer, 'done');
	},

	drawList($list, state) {
		this.toDoList
			.filter(todo => todo.state === state)
			.forEach(todo => {
				const $todoTile = utils.generateTodoTile(todo);
				dragDrop.makeTileDraggable($todoTile);
				$list.append($todoTile);
			});
	},

	create(newToDoData) {
		todoService.create(newToDoData)
			.then((newTodo) => {
				const $todoTile = utils.generateTodoTile(newTodo);
				dragDrop.makeTileDraggable($todoTile);
				this.toDoList.push(newTodo);
				this.toDoContainer.append($todoTile);
			});
	},

	progressTodo($todoTile, toDo) {
		let $listToAppend;
		let methodToCall;
		switch (toDo.state) {
			case 'toDo':
				toDo.state = 'inProgress';
				$listToAppend = this.inProgressContainer;
				methodToCall = 'toInProgress';
				break;
			case 'inProgress':
				toDo.state = 'done';
				$listToAppend = this.doneContainer;
				methodToCall = 'toDone';
				break
		}
		todoService[methodToCall](toDo.id).then(() => {
			$listToAppend.append($todoTile.detach().removeAttr('style'));
		});
	}
};