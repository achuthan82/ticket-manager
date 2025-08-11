import DashboardsIcon from 'assets/dualicons/dashboards.svg?react'
import StatisticIcon from 'assets/nav-icons/statistic.svg?react'
// import WindowIcon from 'assets/nav-icons/window.svg?react'
// import OrderTimerIcon from 'assets/nav-icons/shopping-cart.svg?react'
// import PersonalChartIcon from 'assets/nav-icons/personal-chart.svg?react'
// import BtcIcon from 'assets/nav-icons/btc.svg?react'
// import BankBuildIcon from 'assets/nav-icons/bank-build.svg?react'
// import Statistic2Icon from 'assets/nav-icons/statistic-2.svg?react'
// import MegaphoneIcon from 'assets/nav-icons/megaphone.svg?react'
// import MapIcon from 'assets/nav-icons/map.svg?react'
// import StudentIcon from 'assets/nav-icons/student.svg?react'
// import StethoscopeIcon from 'assets/nav-icons/stethoscope.svg?react'
// import PeopleIcon from 'assets/nav-icons/people.svg?react'
// import PeopleEditIcon from 'assets/nav-icons/people-edit.svg?react'
// import PeopleMonitorIcon from 'assets/nav-icons/people-monitor.svg?react'
// import TeacherIcon from 'assets/nav-icons/teacher.svg?react'
// import MonitorIcon from 'assets/nav-icons/monitor.svg?react'
// import ProjectBoardIcon from 'assets/nav-icons/project-board.svg?react'
// import WidgetIcon from 'assets/nav-icons/widget.svg?react'
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'

const ROOT_DASHBOARDS = '/dashboards'

const path = (root, item) => `${root}${item}`;

export const dashboards = {
    id: 'dashboards',
    type: NAV_TYPE_ROOT,
    path: '/dashboards',
    title: 'Dashboards',
    transKey: 'nav.dashboards.dashboards',
    Icon: DashboardsIcon,
    childs: [
        {
            id: 'dashboards.users',
            path: path(ROOT_DASHBOARDS, '/users'),
            type: NAV_TYPE_ITEM,
            title: 'Users',
            transKey: 'Users',
            Icon: StatisticIcon,
        },
    ]
}
