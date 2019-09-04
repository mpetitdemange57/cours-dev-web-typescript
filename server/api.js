const ALL_TODOS = require('./data/all');
const MY_TODOS = require('./data/my');

exports.listAll = function (req, res) {
	console.log(`Requesting all to dos`);
	res.status(200).json(formatted(req, ALL_TODOS));
};

exports.listMine = function (req, res) {
	console.log('Requesting my todos');
	res.status(200).json(formatted(req, MY_TODOS));
};

exports.create = function (req, res) {
	const newToDo = {...req.body, state: 'toDo', id: createId()};
	console.log(`Creating new to do with id ${newToDo.id} : ${newToDo.title} - ${newToDo.type}`);
	MY_TODOS.push(newToDo);
	res.status(200).json(formatted(req, newToDo));
};

exports.toInProgress = function (req, res) {
	const id = req.params['id'];
	const todo = MY_TODOS.find(todo => todo.id === id);
	console.log(`Putting to do with id ${todo.id} : ${todo.title} - ${todo.type} in progress`);
	todo.state = 'inProgress';
	res.status(200).send();
};

exports.toDone = function (req, res) {
	const id = req.params['id'];
	const todo = MY_TODOS.find(todo => todo.id === id);
	console.log(`Putting to do with id ${todo.id} : ${todo.title} - ${todo.type} in done`);
	todo.state = 'done';
	res.status(200).send();
};

exports.delete = function (req, res) {
	const id = req.params['id'];
	const index = MY_TODOS.findIndex(todo => todo.id === id);
	const deletedTodo = MY_TODOS.splice(index, 1)[0];
	console.log(`Putting to do with id ${deletedTodo.id} : ${deletedTodo.title} - ${deletedTodo.type} in done`);
	res.status(200).send();
};

function createId() {
	return new Date().getTime() + "";
}

function formatted(req, data) {
	return {
		data,
		metadata: {
			url: req.url
		}
	}
}