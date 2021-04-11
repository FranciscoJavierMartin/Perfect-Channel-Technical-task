import React, { useEffect, useState } from 'react';
import { Todo } from './models/todo';
import { getCompletedTodos, getPendingTodos } from './network/todos';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const App: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [pendingTodos, setPendingTodos] = useState<Todo[]>([]);
  const [forcedRefresh, setForcedRefresh] = useState<boolean>(false);

  useEffect(() => {
    getCompletedTodos().then((res) => {
      setCompletedTodos(res);
    });
    getPendingTodos().then((res) => {
      setPendingTodos(res);
    });
  }, [setCompletedTodos, setPendingTodos, forcedRefresh]);

  return (
    <div>
      <AddTodo forceRefresh={setForcedRefresh}/>
      <TodoList
        todos={completedTodos}
        title='Completed Todos'
        forceRefresh={setForcedRefresh}
      />
      <TodoList
        todos={pendingTodos}
        title='Pending Todos'
        forceRefresh={setForcedRefresh}
      />
    </div>
  );
};

export default App;
