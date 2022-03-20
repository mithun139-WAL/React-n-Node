/* eslint-disable object-curly-spacing */
/* eslint-disable arrow-body-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
import {useState, useEffect} from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {item: 'Cook Breakfast', status: 'Complete'},
    {item: 'Do Coding', status: 'incomplete'},
  ]);
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get('/todos')
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addTodo = (event) => {
    event.preventDefault();
    const todoObject = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    axios
      .post('/todos', todoObject)
      .then((res) => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTodo = (indexToDelete) => {
    axios
      .delete('/todos/' + indexToDelete)
      .then((res) => {
        console.log(res.data);
      })
      .then((error) => {
        console.log(error);
      });
    getTodos();
  };

  return (
    <div className="container-fluid">
      <div className="card col-lg-4 col-md-6 col-sm-10">
        <h1>Todos</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            name="item"
            className="form-control"
            placeholder="Enter a Task to do"
          />
          <select name="status" className="form-control">
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="data">
        <h1>Todo List</h1>
        <table>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((val, index) => {
              return (
                <tr>
                  <td>{val.item}</td>
                  <td>{val.status}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => {
                        deleteTodo(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoApp;
