import React, { memo, useEffect, useState } from 'react';
import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import {
  CaretDownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import icons from '../../utils/icon';
import path from '../../utils/path';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/useUserStore';
import { Search } from '../index';

const Navigation = ({ children, menuNavbarItemsStudent }) => {
  const { Header, Sider } = Layout;
  const { IoIosNotifications } = icons;
  const [notificationCount, setNotificationCount] = useState(3);
  const { resetUserStore } = useUserStore();
  const [collapsed, setCollapsed] = useState(false);
  const { Content } = Layout;
  const location = useLocation();
  const [searchFor, setSearchFor] = useState('');

  useEffect(() => {
    const subPath = location.pathname.split('/').pop();
    console.log(subPath);

    if (subPath === 'student' || subPath===path.STUDENT_GROUP || subPath === path.USER_PROFILE || subPath === '*') setSearchFor(null);
    else setSearchFor(subPath);
  }, [location.pathname]);

  const handleLogOut = () => {
    resetUserStore();
    toast.success('Log Out SuccessFull!!!');
  };

  const items = [
    {
      key: 'account',
      label: 'My Account',
      disabled: true
    },
    {
      type: 'divider'
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: (
        <NavLink to={path.USER_PROFILE} className="text-white">
          View Profile
        </NavLink>
      )
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log Out',
      onClick: handleLogOut
    }
  ];

  return (
    <Layout className="bg-gray-300 flex w-3/5 h-screen">
      <Sider className="text-white" collapsed={collapsed}>
        <div className="h-[8vh] flex items-center justify-center py-[1vh] bg-gray-200 ">
          <NavLink
            className="flex items-center h-full"
            to={'/'}
            onClick={() => {
              setVariant('/public');
            }}
          >
            <img src="/public/logoFPT.svg" className="object-contain h-full" alt="logo" />
          </NavLink>
        </div>
        <Menu
          className="h-[92vh] w-full flex flex-col gap-1 text-white font-semibold"
          mode="inline"
          items={menuNavbarItemsStudent}
          theme="light"
        />
      </Sider>
      <Layout className="relative">
        <Header className="bg-gray-200 p-0 flex items-center h-[8vh] justify-between">
          <Button
            type="text"
            size="20"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            icon={
              collapsed ? (
                <MenuFoldOutlined style={{ fontSize: 25 }} />
              ) : (
                <MenuUnfoldOutlined style={{ fontSize: 25 }} />
              )
            }
          />
          <div className="flex gap-5 pr-[2rem] items-center">
            <div
              className="relative cursor-pointer"
              onClick={() => {
                setNotificationCount(0);
              }}
            >
              <IoIosNotifications className="text-yellow-600" size={30} />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {notificationCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 ">
              <Dropdown menu={{ items }} trigger={['click']}>
                <Space>
                  <img
                    src="/public/avatar-default.jpg"
                    alt="avatar"
                    className="object-cover h-[6vh] w-[6vh] rounded-full cursor-pointer"
                  />
                  <CaretDownOutlined />
                </Space>
              </Dropdown>

              <div className="flex flex-col items-center justify-evenly">
                <p className="h-[3vh] text-sm font-semibold">Quốc Thắng</p>
                <p className="h-[3vh] text-sm">Student</p>
              </div>
            </div>
          </div>
        </Header>

        {/* Component con */}
        <Content className="p-2 overflow-auto h-[calc(100vh-8vh)] w-full">
          <div className="w-full h-full flex flex-col break-words">
            {searchFor && <Search searchFor={searchFor} />}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(Navigation);
