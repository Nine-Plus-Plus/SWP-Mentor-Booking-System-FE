import React, { memo, useState } from 'react'
import { Button, Dropdown, Layout, Menu, Space, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom'
import { AppstoreOutlined, AreaChartOutlined, CaretDownOutlined, ContactsOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, SolutionOutlined, TeamOutlined, TransactionOutlined, UserOutlined } from '@ant-design/icons'
import icons from '../../utils/icon'

const Navigation = () => {
    const { Header, Sider } = Layout
    const [collapsed, setCollapsed] = useState(false)
    const { IoIosNotifications } = icons
    const [notificationCount, setNotificationCount] = useState(3)

    const menuNavbarItems = [
        {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            className: 'text-white text-lg',
        },
        {
            key: "mentor",
            icon: <SolutionOutlined />,
            label: "Mentor",
            className: 'text-white text-lg',
        },
        {
            key: "activity",
            icon: <AppstoreOutlined />,
            label: "Activity",
            className: 'text-white text-lg',
        },
        {
            key: "progress",
            icon: <AreaChartOutlined />,
            label: "Process",
                className: 'text-white text-lg',
        },
        {
            key: "class",
            icon: <ContactsOutlined />,
            label: "Class",
            className: 'text-white text-lg',
        },
        {
            key: "group",
            icon: <TeamOutlined />,
            label: "Group",
            className: 'text-white text-lg',
        },
        {
            key: "point",
            icon: <TransactionOutlined />,
            label: "History point",
            className: 'text-white text-lg',
        },
    ];

    const items = [
        {
            key: 'account',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "View Profile",
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Settings",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Log Out",
        },
    ];

    
    // const menuItems = [
    //     {
    //       key: "home",
    //       icon: <HomeOutlined />,
    //       label: <NavLink to="/home" className="text-white">Home</NavLink>,
    //       className: 'text-white text-lg',
    //     },
    //     {
    //       key: "mentor",
    //       icon: <SolutionOutlined />,
    //       label: <NavLink to="/mentor" className="text-white">Mentor</NavLink>,
    //       className: 'text-white text-lg',
    //     },
    //     {
    //       key: "activity",
    //       icon: <AppstoreOutlined />,
    //       label: <NavLink to="/activity" className="text-white">Activity</NavLink>,
    //       className: 'text-white text-lg',
    //     },
    //     {
    //       key: "progress",
    //       icon: <AreaChartOutlined />,
    //       label: <NavLink to="/progress" className="text-white">Process</NavLink>,
    //       className: 'text-white text-lg',
    //     },
    //     {
    //       key: "class",
    //       icon: <ContactsOutlined />,
    //       label: <NavLink to="/class" className="text-white">Class</NavLink>,
    //       className: 'text-white text-lg',
    //     },
    //     {
    //       key: "group",
    //       icon: <TeamOutlined />,
    //       label: <NavLink to="/group" className="text-white">Group</NavLink>,
    //       className: 'text-white text-lg',
    //     },
    //     {
    //       key: "point",
    //       icon: <TransactionOutlined />,
    //       label: <NavLink to="/point" className="text-white">History point</NavLink>,
    //       className: 'text-white text-lg',
    //     },
    //   ];


    return (
        <Layout className='bg-gray-300'>
            <Sider className='text-white' collapsed={collapsed} >
                <div className='h-[8vh] flex items-center justify-center py-[1vh] bg-gray-200 '>
                    <NavLink className='flex items-center h-full'
                        to={'.'}
                        onClick={() => { setVariant('/public') }}
                    >
                        <img src='logoFPT.svg' className='object-contain h-full' />
                    </NavLink>
                </div>
                <Menu
                    className='h-[92vh] w-full flex flex-col gap-3 text-white font-semibold'
                    mode='inline'
                    items={menuNavbarItems}
                    theme='light'
                />
            </Sider>
            <Layout>
                <Header className='bg-gray-200 p-0 flex items-center h-[8vh] justify-between'>
                    <Button
                        type='text'
                        size='20'
                        onClick={() => {setCollapsed(!collapsed)}
                        }
                        icon={collapsed ? <MenuFoldOutlined style={{ fontSize: 25 }} /> : <MenuUnfoldOutlined style={{ fontSize: 25 }}/>}
                    />
                    <div className='flex gap-5 pr-[2rem] items-center'>
                        <div className="relative cursor-pointer" onClick={() => {setNotificationCount(0)}
                        }>
                            <IoIosNotifications className='text-yellow-600' size={30} />
                            {notificationCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                                    {notificationCount}
                                </span>
                            )}
                        </div>
                        <div className='flex items-center gap-2 '>
                            <Dropdown menu={{ items, }} trigger={['click']}>
                                <Space>
                                    <img 
                                        src='avatar-default.jpg' 
                                        alt='avatar' 
                                        className='object-cover h-[6vh] w-[6vh] rounded-full cursor-pointer' 
                                    />
                                    <CaretDownOutlined />
                                </Space>
                            </Dropdown>                       

                            <div className='flex flex-col items-center justify-evenly'>
                                <p className='h-[3vh] text-sm font-semibold'>
                                    Quốc Thắng
                                </p>
                                <p className='h-[3vh] text-sm'>
                                    Student
                                </p>
                            </div>
                        </div>
                    </div>
                </Header>   
            </Layout>
        </Layout>
    )
}

export default Navigation