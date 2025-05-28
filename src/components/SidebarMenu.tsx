// src/components/SidebarMenu.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SidebarMenu.css';

type SubMenu = {
  id: string;
  label: string;
  path: string; // Thêm path để điều hướng
};

type Menu = {
  id: string;
  label: string;
  subMenus: SubMenu[];
};

const menus: Menu[] = [
  { id: 'A', label: 'A', subMenus: [{ id: 'A1', label: 'A1', path: '/A1' }, { id: 'A2', label: 'A2', path: '/A2' }, { id: 'A3', label: 'A3', path: '/A3' }] },
  { id: 'B', label: 'B', subMenus: [{ id: 'B1', label: 'B1', path: '/B1' }, { id: 'B2', label: 'B2', path: '/B2' }] },
  { id: 'C', label: 'C', subMenus: [{ id: 'C1', label: 'C1', path: '/C1' }] },
];

const SidebarMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(prev => (prev === menuId ? null : menuId));
  };

  const handleSubMenuClick = (path: string) => {
    navigate(path);
  };
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
  </div>
);

  
};

export default SidebarMenu;
