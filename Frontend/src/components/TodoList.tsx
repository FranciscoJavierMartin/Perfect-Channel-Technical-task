import React from 'react';
import { Todo } from '../models/todo';
import { toggleTodo } from '../network/todos';
import loadTodos from '../store/todo/todoAction';
import { useTodoContext } from '../store/todo/TodoContext';

interface TodoListProps {
  todos: Todo[];
  title: string;
  message: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, title, message }) => {
  const { dispatch: todoDispatch } = useTodoContext();

  function toggleHandler(id: string) {
    toggleTodo(id).then(() => loadTodos(todoDispatch));
  }

  return (
    <div>
      <h2>{title}</h2>
      {todos.length === 0 ? (
        <span>{message}</span>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type='checkbox'
                checked={todo.isCompleted}
                onChange={() => toggleHandler(todo.id)}
              />
              <span>{todo.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
