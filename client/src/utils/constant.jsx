import { AppstoreOutlined, AreaChartOutlined, ContactsOutlined, HomeOutlined, NotificationOutlined, SolutionOutlined, TeamOutlined, TransactionOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import path from "./path";

export const menuNavbarItemsStudent = [
    {
        key: "home",
        icon: <HomeOutlined />,
        label: <NavLink to={'/'} className="text-white">Home</NavLink>,
        className: 'text-white text-lg',
    },
    {
        key: "class",
        icon: <ContactsOutlined />,
        label: <NavLink to={path.STUDENT_VIEW_CLASS} className="text-white">Class</NavLink>,
        className: 'text-white text-lg',
    },
    {
        key: "mentor",
        icon: <SolutionOutlined />,
        label: <NavLink to={path.STUDENT_VIEW_MENTOR} className="text-white">Mentor</NavLink>,
        className: 'text-white text-lg',
    },
    {
        key: "group",
        icon: <TeamOutlined />,
        label: "Group",
        className: 'text-white text-lg',
    },
    {
        key: "notification",
        icon: <NotificationOutlined />,
        label: "Notification",
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
        key: "point",
        icon: <TransactionOutlined />,
        label: "History point",
        className: 'text-white text-lg',
    },
];

export const menuNavbarItemsMentor = [
    {
        key: "home",
        icon: <HomeOutlined />,
        label: <NavLink to={'/'} className="text-white">Home</NavLink>,
        className: 'text-white text-lg',
    },
    {
        key: "class",
        icon: <ContactsOutlined />,
        label: <NavLink to={path.STUDENT_VIEW_CLASS} className="text-white">Class</NavLink>,
        className: 'text-white text-lg',
    },
    {
        key: "group",
        icon: <TeamOutlined />,
        label: "Group",
        className: 'text-white text-lg',
    },
    {
        key: "notification",
        icon: <AppstoreOutlined />,
        label: "Notification",
        className: 'text-white text-lg',
    },
    {
        key: "activity",
        icon: <AppstoreOutlined />,
        label: "Activity",
        className: 'text-white text-lg',
    },
    {
        key: "point",
        icon: <TransactionOutlined />,
        label: "History point",
        className: 'text-white text-lg',
    },
];
