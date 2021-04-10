import React from 'react';
import { Todo } from '../models/todo';
import { toggleTodo } from '../network/todos';

interface TodoListProps {
  todos: Todo[];
  title: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, title }) => {
  function toggleHandler(id: string) {
    toggleTodo(id);
  }

  return (
    <div>
      <h2>{title}</h2>
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
    </div>
  );
};

export default TodoList;
