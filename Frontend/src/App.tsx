import React, { useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { useTodoContext } from './store/todo/TodoContext';
import loadTodos from './store/todo/todoAction';
import './App.css';

const App: React.FC = () => {
  const {
    state: { completedTodos, pendingTodos },
    dispatch: todoDispatch,
  } = useTodoContext();

  useEffect(() => {
    loadTodos(todoDispatch);
  }, []);

  return (
    <div className='container'>
      <AddTodo />
      <div className='row'>
        <TodoList
          todos={completedTodos}
          title='Completed Todos'
          message='Time to work. Try to complete some task.'
        />
        <TodoList
          todos={pendingTodos}
          title='Pending Todos'
          message='You have completed all your goals. Congrats!'
        />
      </div>
    </div>
  );
};

export default App;
