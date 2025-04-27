import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header: AntdHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = () => {
    if (
      location.pathname.startsWith('/gallery') ||
      location.pathname.startsWith('/images')
    ) {
      return '/';
    }
    return location.pathname;
  };

  return (
    <AntdHeader
      style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee' }}
    >
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey()]}
        onClick={(e) => navigate(e.key)}
        style={{ display: 'flex', gap: '24px', fontSize: '16px' }}
      >
        <Menu.Item key="/">갤러리</Menu.Item>
        <Menu.Item key="/game">게임</Menu.Item>
        <Menu.Item key="/filter">필터 검색</Menu.Item>
      </Menu>
    </AntdHeader>
  );
};

export default Header;
