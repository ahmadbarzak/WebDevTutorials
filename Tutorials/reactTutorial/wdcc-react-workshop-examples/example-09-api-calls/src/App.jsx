import { useState } from 'react';
import NewToDoItem from './NewToDoItem';
import ToDoList from './ToDoList';
import useGet from './useGet';
import axios from 'axios';

function App() {

  // Change to your own name to work with a different set of TODOs
  const [username, setUsername] = useState('wdcc');

  // Get todos from the API. e.g. https://wdcc-workshop-server.trex-sandwich.com/api/todos/wdcc
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { data: todos, reset } = useGet(`${API_BASE_URL}/api/todos/${username}`, []);

  // Note: todos have an id, description, and isComplete status.

  /**
   * This function will be called when a to-do item's checkbox is clicked.
   * We will send a PUT request to modify the clicked to-do item's isComplete status.
   */
  function handleTodoStatusChanged(todo, isComplete) {
    todo.isComplete = isComplete;
    axios.put(`${API_BASE_URL}/api/todos/${username}/${todo.id}`, todo) // PUT the changed todo to the API (will overwrite the one already there)
      .then(reset); // Cause the todo list to reload from the API, which should show the updated status
  }

  /**
   * This function will be called when the "add item" button is clicked. We will
   * add a new to-do item.
   */
  function handleAddTodo(description) {
    axios.post(`${API_BASE_URL}/api/todos/${username}`, { description }) // POST the new todo
      .then(reset); // Reload the todo list when done
  }

  /**
   * This function will be called when the "remove" button on a to-do item is clicked. We will remove the item
   * with the given id.
   */
  function handleRemoveTodo(id) {
    axios.delete(`${API_BASE_URL}/api/todos/${username}/${id}`)
      .then(reset);
  }

  return (
    <div>
      <div className="box">
        <h1>My todos</h1>
        <ToDoList items={todos}
          onTodoStatusChanged={handleTodoStatusChanged}
          onRemove={handleRemoveTodo} />
      </div>

      <div className="box">
        <h1>Add item</h1>
        <NewToDoItem onAddTodo={handleAddTodo} />
      </div>

    </div>
  );
}

export default App;