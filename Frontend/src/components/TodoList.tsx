import React from 'react';
import { Todo } from '../models/todo';

interface TodoListProps {
  todos: Todo[];
  title: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
