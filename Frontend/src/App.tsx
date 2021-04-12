import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { useTodoContext } from './store/todo/TodoContext';
import loadTodos from './store/todo/todoAction';
import './App.css';

const App: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const {
    state: { completedTodos, pendingTodos },
    dispatch: todoDispatch,
  } = useTodoContext();

  useEffect(() => {
    loadTodos(todoDispatch);
  }, [todoDispatch]);

  let content: React.ReactNode;

  switch (activeTabIndex) {
    case 0:
      content = (
        <TodoList
          todos={pendingTodos}
          title='Pending TO-DO'
          message='You have completed all your goals. Congrats!'
          image='success'
          imageAlt='Success'
        />
      );
      break;
    case 1:
      content = (
        <TodoList
          todos={completedTodos}
          title='Completed TO-DO'
          message='Time to work. Try to complete some task.'
          image='hard-work'
          imageAlt='Hard work'
        />
      );
      break;
    default:
      content = (
        <TodoList
          todos={pendingTodos}
          title='Pending TO-DO'
          message='You have completed all your goals. Congrats!'
          image='success'
          imageAlt='Success'
        />
      );
  }

  return (
    <div className='container'>
      <h1 className='text-center'>The coolest TO-DO App</h1>
      <AddTodo />
      <div className='row'>
        <div className='btn-group btn-group-lg w-100'>
          <button
            className={[
              'btn',
              activeTabIndex === 0 ? 'btn-primary' : 'btn-link',
            ].join(' ')}
            onClick={() => setActiveTabIndex(0)}
          >
            Pending
          </button>
          <button
            className={[
              'btn',
              activeTabIndex === 1 ? 'btn-primary' : 'btn-link',
            ].join(' ')}
            onClick={() => setActiveTabIndex(1)}
          >
            Completed
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export default App;
