import React, { useState, useEffect } from 'react'
import { FaAffiliatetheme, FaArrowLeft, FaPlusSquare, FaPowerOff } from 'react-icons/fa'
import { MdManageAccounts, MdOutlineDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')  // Initialize theme state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeAllSubMenus = () => {
    const allSubMenus = document.querySelectorAll('.sub-menu-show')
    allSubMenus.forEach((menu) => { // Fixed the typo here (from 'Menu' to 'menu')
      menu.classList.remove('show')
      menu.previousElementSibling.classList.remove('rotate')
    })
  }

  const toggleSubMenu = (button) => {
    if (!button.nextElementSibling.classList.contains('show')) {
      closeAllSubMenus()
    }
    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if (isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }

  useEffect(() => {
    document.body.className = theme  // Apply the current theme to the body
    localStorage.setItem('theme', theme) // Save the theme in localStorage
  }, [theme])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    window.location.href = '/'
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
      <button id='toggle-btn' onClick={toggleSidebar}><FaArrowLeft /></button>
      <div className="profile">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s" alt="Profile" />
      </div>
      <ul>
        <li><Link className='icon' to="/"><MdOutlineDashboard size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Dashboard</span></Link></li>
        <li><Link className='icon' to="/add-product"><FaPlusSquare size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Add Product</span></Link></li>
        <li><Link className='icon' to="/profile"><MdManageAccounts size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Manage Profile</span></Link></li>
        <li className='icon' onClick={toggleTheme}><FaAffiliatetheme size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Change Theme</span></li>
        <li className='icon' onClick={handleLogout}><FaPowerOff size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Logout</span></li>
      </ul>
    </nav>
  )
}

export default Sidebar
