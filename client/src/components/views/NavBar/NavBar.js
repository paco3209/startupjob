import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.scss';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    
    <nav className="navbar is-white topNav">
    <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="../">
          <img src="../images/bulma.png" width="112" height="28" />
        </a>
        <div className="navbar-burger burger" data-target="topNav">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="topNav" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/">Inicio</a>
          <a className="navbar-item" href="/about">Nosotros</a>
          
        </div>
        <RightMenu />
      </div>
    </div>
  </nav>
  
  )
}

export default NavBar