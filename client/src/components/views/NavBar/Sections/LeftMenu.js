import React from 'react';
import { Menu } from 'antd';
import './Navbar.scss';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Inicio</a>
    </Menu.Item>
    <Menu.Item>
    <a href="/">Nosotros</a>
    </Menu.Item>
    
    
  </Menu>
  )
}

export default LeftMenu