// src/App.tsx
import React from 'react';
import SidebarMenu from './components/SidebarMenu';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu />
      <div style={{ marginLeft: 20, padding: 20, flex: 1 }}>
        <AppRouter />
      </div>
    </div>
  );
};
export default App;
