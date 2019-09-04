import 'bootstrap';
import 'webpack-jquery-ui/draggable';
import 'webpack-jquery-ui/droppable';

import '../src/css/index.scss';

import { TodoManagement } from './todo-management';
import { TodoService } from './todo-service';

$(() => {
  new TodoManagement(new TodoService());
});

