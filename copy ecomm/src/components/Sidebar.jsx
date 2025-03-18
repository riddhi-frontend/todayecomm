import React, { useState, useEffect } from 'react';
import { FaAffiliatetheme, FaBars, FaHome, FaPlusSquare, FaPowerOff } from 'react-icons/fa';
import { MdManageAccounts, MdOutlineDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/dashboard';
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
      <button onClick={toggleSidebar}><FaBars /></button>
      <div className="profile"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s' /></div>
      <ul>
        <li><Link className='icon' to="/"><MdOutlineDashboard size={24} /><span>Dashboard</span></Link></li>
        <li><Link className='icon' to="/add-product"><FaPlusSquare size={24} /><span>Add Product</span></Link></li>
        <li><Link className='icon' to="/profile"><MdManageAccounts size={24} /><span>Manage Profile</span></Link></li>
        <li className='icon' onClick={toggleTheme}><FaAffiliatetheme size={24} /><span>Change Theme</span></li>
        <li className='icon' onClick={handleLogout}><FaPowerOff size={24} /><span>Logout</span></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
