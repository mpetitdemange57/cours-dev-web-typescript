import 'bootstrap';
import 'webpack-jquery-ui/draggable';
import 'webpack-jquery-ui/droppable';

import '../css/index.scss';
import todoManagement from './todo-management';


$(() => {
	todoManagement.init();
});
