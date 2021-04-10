import React, { useEffect, useState } from 'react';
import { Todo } from './models/todo';
import { getCompletedTodos, getPendingTodos } from './network/todos';
import './App.css';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [pendingTodos, setPendingTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getCompletedTodos().then((res) => {
      setCompletedTodos(res);
    });
    getPendingTodos().then((res) => {
      setPendingTodos(res);
    });
  }, [setCompletedTodos, setPendingTodos]);

  return (
    <div>
      <TodoList todos={completedTodos} title='Completed Todos' />
      <TodoList todos={pendingTodos} title='Pending Todos' />
    </div>
  );
};

export default App;
