import {
  AppstoreOutlined,
  AreaChartOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  HomeOutlined,
  NotificationOutlined,
  ReconciliationOutlined,
  ScheduleOutlined,
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
      <NavLink to={path.USER_VIEW_CLASS} className="text-white">
        Class
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'mentor',
    icon: <SolutionOutlined />,
    label: (
      <NavLink to={path.USER_VIEW_MENTOR} className="text-white">
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
    label: 'Meeting',
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
      <NavLink to={path.USER_VIEW_CLASS} className="text-white">
        Class
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'group',
    icon: <TeamOutlined />,
    label: (
      <NavLink to={path.LIST_GROUP} className="text-white">
        Group
      </NavLink>
    ),
    className: 'text-white text-lg'
  },
  {
    key: 'schedule',
    icon: <ClockCircleOutlined />,
    label: 'Schedule',
    className: 'text-white text-lg'
  },
  {
    key: 'mentor',
    icon: <SolutionOutlined />,
    label: (
      <NavLink to={path.USER_VIEW_MENTOR} className="text-white">
        Mentor
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
    icon: <ScheduleOutlined />,
    label: 'Meeting',
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
