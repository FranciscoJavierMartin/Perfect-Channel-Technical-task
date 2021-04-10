import React, { useEffect } from 'react';
import './App.css';
import { getTodos } from './network/todos';

const App: React.FC = () => {
  useEffect(() => {
    getTodos().then(console.log);
  });
  return <div></div>;
};

export default App;
