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
  }, [todoDispatch]);

  return (
    <div className='container'>
      <h1 className='text-center'>The coolest TO-DO App</h1>
      <AddTodo />
      <div className='row'>  
        <TodoList
          todos={pendingTodos}
          title='Pending TO-DO'
          message='You have completed all your goals. Congrats!'
          image='success'
          imageAlt='Success'
        />
        <TodoList
          todos={completedTodos}
          title='Completed TO-DO'
          message='Time to work. Try to complete some task.'
          image='hard-work'
          imageAlt='Hard work'
        />
      </div>
    </div>
  );
};

export default App;
