import {
  AppstoreOutlined,
  AreaChartOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  HomeOutlined,
  NotificationOutlined,
  ReconciliationOutlined,
  SolutionOutlined,
  TeamOutlined,
  TransactionOutlined,
  UserOutlined
} from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
import path from './path';

export const menuNavbarItemsStudent = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: (
      <NavLink to={'/'} className="text-white">
        Home
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'class',
    icon: <ContactsOutlined />,
    label: (
      <NavLink to={path.STUDENT_VIEW_CLASS} className="text-white">
        Class
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'mentor',
    icon: <SolutionOutlined />,
    label: (
      <NavLink to={path.STUDENT_VIEW_MENTOR} className="text-white">
        Mentor
      </NavLink>
    ),

    className: 'text-white text-lg'
  },
  {
    key: 'group',
    icon: <TeamOutlined />,
    label: (
      <NavLink to={path.STUDENT_GROUP} className="text-white">
        Group
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'notification',
    icon: <NotificationOutlined />,
    label: 'Notification',
    className: 'text-white text-lg'
  },
  {
    key: 'meeting',
    icon: <ClockCircleOutlined />,
    label: (
      <NavLink to={path.STUDENT_MEETING} className="text-white">
        Meeting
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'booking',
    icon: <ReconciliationOutlined />,
    label: (
      <NavLink to={path.STUDENT_BOOKING} className="text-white">
        Booking
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'progress',
    icon: <AreaChartOutlined />,
    label: 'Process',
    className: 'text-white text-lg'
  },
  {
    key: 'point',
    icon: <TransactionOutlined />,
    label: (
      <NavLink to={path.STUDENT_HISTORY_POINT} className="text-white">
        History Point
      </NavLink>
    ),
    className: 'text-white text-lg'
  }
];

export const menuNavbarItemsMentor = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: (
      <NavLink to={'/'} className="text-white">
        Home
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'class',
    icon: <ContactsOutlined />,
    label: (
      <NavLink to={path.STUDENT_VIEW_CLASS} className="text-white">
        Class
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'group',
    icon: <TeamOutlined />,
    label: 'Group',
    className: 'text-white text-lg'
  },
  {
    key: 'notification',
    icon: <AppstoreOutlined />,
    label: 'Notification',
    className: 'text-white text-lg'
  },
  {
    key: 'activity',
    icon: <AppstoreOutlined />,
    label: 'Activity',
    className: 'text-white text-lg'
  },
  {
    key: 'point',
    icon: <TransactionOutlined />,
    label: 'History point',
    className: 'text-white text-lg'
  }
];

export const menuNavbarItemsAdmin = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: (
      <NavLink to={'/'} className="text-white">
        Home
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: (
      <NavLink to={path.STUDENT_PROFILE} className="text-white">
        Profile
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'users-manager',
    icon: <ContactsOutlined />,
    label: (
      <NavLink to={path.ADMIN_USER_MANAGER} className="text-white">
        Users
      </NavLink>
    ),
    className: 'text-white text-lg'
  }
];

export const roleForComponent = {
  ADMIN: path.PUBLIC_ADMIN,
  STUDENT: path.PUBLIC_STUDENT,
  MENTOR: path.PUBLIC_MENTOR
};
