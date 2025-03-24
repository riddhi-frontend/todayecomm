import React, { useState, useEffect } from 'react'
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { AppsFilledIcon, ExitIcon, MoonIcon, NoteAddIcon } from '@shopify/polaris-icons';
import { AppProvider, Button } from '@shopify/polaris';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')  // Initialize theme state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeAllSubMenus = () => {
    const allSubMenus = document.querySelectorAll('.sub-menu-show')
    allSubMenus.forEach((menu) => {
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
    // Apply the current theme class to the body
    document.body.className = theme
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
    <AppProvider>
    <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
      <Button id='toggle-btn' onClick={toggleSidebar}><MdOutlineKeyboardDoubleArrowLeft /></Button>
      <ul>
        <li>
          <NavLink className='icon' activeClassName="active" to="/">
            <div className="customicon"><AppsFilledIcon tone="base" fontSize="--p-font-size-275" /></div>
          <span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Dashboard</span></NavLink>
        </li>
        <li>
          <NavLink className='icon' activeClassName="active" to="/add-product">
            <div className="customicon"><NoteAddIcon/></div>
          <span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Add Product</span></NavLink>
        </li>
        <li className='icons' onClick={toggleTheme}>
          <div className="customicon"><MoonIcon/></div>
          <span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Change Theme</span>
        </li>
        <li className='icons' onClick={handleLogout}>
          <div className="customicon"><ExitIcon size={24} className='svg' /></div>
          <span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Logout</span>
        </li>
      </ul>
    </nav>
    </AppProvider>
  )
}

export default Sidebar
