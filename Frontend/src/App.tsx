import React, { useEffect, useState } from 'react';
import { Todo } from './models/todo';
import { getCompletedTodos, getPendingTodos } from './network/todos';
import './App.css';

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
  });
  return <div>
    
  </div>;
};

export default App;
