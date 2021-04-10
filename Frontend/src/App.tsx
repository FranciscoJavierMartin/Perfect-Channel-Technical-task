import React, { useEffect } from 'react';
import './App.css';
import { getCompletedTodos } from './network/todos';

const App: React.FC = () => {
  useEffect(() => {
    getCompletedTodos().then(console.log);
  });
  return <div></div>;
};

export default App;
