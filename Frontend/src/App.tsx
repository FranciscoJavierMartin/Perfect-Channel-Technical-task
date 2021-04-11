import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { useTodoContext } from './store/TodoContext';
import loadTodos from './store/todoAction';
import './App.css';

const App: React.FC = () => {
  const [forcedRefresh, setForcedRefresh] = useState<boolean>(false);

  const {
    state: { completedTodos, pendingTodos },
    dispatch: todoDispatch,
  } = useTodoContext();

  useEffect(() => {
    loadTodos(todoDispatch);
  }, [forcedRefresh]);

  return (
    <div>
      <AddTodo forceRefresh={setForcedRefresh} />
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
