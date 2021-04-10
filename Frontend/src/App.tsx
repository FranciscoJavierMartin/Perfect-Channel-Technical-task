import React, { useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Task`)
      .then((res) => res.json())
      .then(console.log);
  });
  return <div></div>;
};

export default App;
