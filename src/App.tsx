import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  const location = useLocation();
  // Ẩn sidebar khi ở trang login (đường dẫn "/")
  const hideSidebar = location.pathname === '/';

  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && <SidebarMenu />}
      <div style={{ marginLeft: hideSidebar ? 0 : 20, padding: 20, flex: 1 }}>
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
