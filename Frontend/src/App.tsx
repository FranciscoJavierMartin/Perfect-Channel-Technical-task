import React, { useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { useTodoContext } from './store/todo/TodoContext';
import loadTodos from './store/todo/todoAction';
import './App.css';
import { useToastContext } from './store/toast/ToastContext';

const App: React.FC = () => {
  const {
    state: { completedTodos, pendingTodos },
    dispatch: todoDispatch,
  } = useTodoContext();
  const addToast = useToastContext();

  useEffect(() => {
    loadTodos(todoDispatch);
    addToast('Hello');
  }, []);

  return (
    <div>
      <AddTodo />
      <TodoList todos={completedTodos} title='Completed Todos' />
      <TodoList todos={pendingTodos} title='Pending Todos' />
    </div>
  );
};

export default App;
