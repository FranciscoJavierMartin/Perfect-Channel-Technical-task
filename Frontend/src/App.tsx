import React, { useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    fetch('http://localhost:5000/api/Task')
      .then((res) => res.json())
      .then(console.log);
  });
  return <div></div>;
};

export default App;
