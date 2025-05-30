import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SidebarMenu.css';
import UserInfo from './UserInfo';

type SubMenu = {
  id: string;
  label: string;
  path: string;
};

type Menu = {
  id: string;
  label: string;
  subMenus: SubMenu[];
};

const menus: Menu[] = [
  {
    id: 'A',
    label: 'Hồ sơ văn bản',
    subMenus: [
      { id: 'A1', label: 'Hồ Sơ', path: '/A1' },
      { id: 'A2', label: 'Văn Bản', path: '/A2' },
      { id: 'A3', label: 'A3', path: '/A3' }
    ]
  },
  {
    id: 'B',
    label: 'B',
    subMenus: [
      { id: 'B1', label: 'B1', path: '/B1' },
      { id: 'B2', label: 'B2', path: '/B2' }
    ]
  },
  {
    id: 'C',
    label: 'C',
    subMenus: [
      { id: 'C1', label: 'C1', path: '/C1' }
    ]
  }
];

const SidebarMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }, []);

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(prev => (prev === menuId ? null : menuId));
  };

  const handleSubMenuClick = (path: string) => {
    navigate(path);
  };

  // Memo hóa handleLogout để tránh render lại UserInfo không cần thiết
  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/');
  }, [navigate]);

  return (
    <div className="sidebar">
      <ul className="menu-list">
        {menus.map(menu => (
          <li key={menu.id}>
            <button
              className={`menu-btn ${activeMenu === menu.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(menu.id)}
            >
              {menu.label}
            </button>

            {activeMenu === menu.id && (
              <ul className="submenu-list">
                {menu.subMenus.map(sub => (
                  <li key={sub.id}>
                    <button
                      className="submenu-btn"
                      onClick={() => handleSubMenuClick(sub.path)}
                    >
                      {sub.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <UserInfo user={user} onLogout={handleLogout} />
    </div>
  );
};

export default SidebarMenu;
