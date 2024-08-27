// src/App.js
import React, { useState } from 'react';
import AdminView from './components/AdminView';
import UserView from './components/UserView';

const App = () => {
  const [view, setView] = useState('user'); // Default to user view

  return (
    <div className="app">
      <button onClick={() => setView(view === 'user' ? 'admin' : 'user')}>
        Switch to {view === 'user' ? 'Admin' : 'User'} View
      </button>
      {view === 'admin' ? <AdminView /> : <UserView />}
    </div>
  );
};

export default App;