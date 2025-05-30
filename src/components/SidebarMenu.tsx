import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SidebarMenu.css';

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
  { id: 'A', label: 'A', subMenus: [{ id: 'A1', label: 'A1', path: '/A1' }, { id: 'A2', label: 'A2', path: '/A2' }, { id: 'A3', label: 'A3', path: '/A3' }] },
  { id: 'B', label: 'B', subMenus: [{ id: 'B1', label: 'B1', path: '/B1' }, { id: 'B2', label: 'B2', path: '/B2' }] },
  { id: 'C', label: 'C', subMenus: [{ id: 'C1', label: 'C1', path: '/C1' }] },
];

const SidebarMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(prev => (prev === menuId ? null : menuId));
  };

  const handleSubMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      <div className="user-info" ref={dropdownRef} onClick={() => setShowDropdown(prev => !prev)}>
        <img src={user.avatar} alt="avatar" className="user-avatar" />
        <div className="user-details">
          <strong>{user.tenNhanVien}</strong>
          <span>{user.tenChiNhanh}</span>
        </div>

        {showDropdown && (
          <div className="user-dropdown">
            <button onClick={(e) => { e.stopPropagation(); alert('Cài đặt chưa triển khai'); }}>⚙ Cài đặt</button>
            <button onClick={(e) => { e.stopPropagation(); handleLogout(); }}>🚪 Thoát</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarMenu;
