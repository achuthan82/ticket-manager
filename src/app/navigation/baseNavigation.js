import { NAV_TYPE_ITEM } from "constants/app.constant";
import DashboardsIcon from "assets/dualicons/dashboards.svg?react";
import TicketIcon from "assets/dualicons/ticket.svg?react";
import UserIcon from "assets/dualicons/user.svg?react";
import { REDIRECT_URL } from "configs/auth.config";
import {
  ArrowLeftCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
// import {
// //   DocumentTextIcon,
// //   ChatBubbleLeftRightIcon,
// //   UsersIcon,
// //   ChartBarIcon,
// //   Cog6ToothIcon
// } from '@heroicons/react/24/outline'

export const baseNavigation = [
  {
    id: "dashboard",
    type: NAV_TYPE_ITEM,
    path: "/home",
    title: "Home",
    transKey: "nav.dashboard.dashboard",
    Icon: DashboardsIcon,
    visible: [1, 2],
  },
  // adding support-ticket to the navigation
  {
    id: "support-ticket",
    type: NAV_TYPE_ITEM,
    path: "/support-ticket",
    title: "Support Ticket",
    transKey: "nav.support-ticket.support-ticket",
    Icon: TicketIcon,
    visible: [1],
  },
  {
    id: "support-user",
    type: NAV_TYPE_ITEM,
    path: "/support-user",
    title: "Support Center",
    transKey: "nav.support-user.support-user",
    Icon: UserIcon,
    visible: [2],
  },

  //   {
  //     id: "user",
  //     type:NAV_TYPE_ITEM,
  //     path: "/users",
  //     title:"Users" ,
  //     transKey : "nav.user.user",
  //     Icon: UserGroupIcon,
  //     visible:[1]
  // },
  // ✅ New FAQ Navigation
  {
    id: "faq",
    type: NAV_TYPE_ITEM,
    path: "/faq",
    title: "Manage FAQ",
    transKey: "nav.faq.faq",
    Icon: QuestionMarkCircleIcon,
    visible: [1], // showing for admin page.
  },
  {
    id: "back-to-shieldnest",
    type: NAV_TYPE_ITEM,
    path: REDIRECT_URL,
    title: "Back to ShieldNest",
    transKey: "nav.support-user.support-user",
    Icon: ArrowLeftCircleIcon,
    visible: [1, 2],
  },
  // {
  //     id: 'documents',
  //     type: NAV_TYPE_ITEM,
  //     path: '/documents',
  //     title: 'Documents',
  //     transKey: 'nav.documents.documents',
  //     Icon: DocumentTextIcon,
  // },
  // {
  //     id: 'prompts',
  //     type: NAV_TYPE_ITEM,
  //     path: '/prompts',
  //     title: 'Prompts',
  //     transKey: 'nav.prompts.prompts',
  //     Icon: ChatBubbleLeftRightIcon,
  //     badge: '42',
  // },
  // {
  //     id: 'users',
  //     type: NAV_TYPE_ITEM,
  //     path: '/users',
  //     title: 'Users',
  //     transKey: 'nav.users.users',
  //     Icon: UsersIcon,
  // },
  // {
  //     id: 'analytics',
  //     type: NAV_TYPE_ITEM,
  //     path: '/analytics',
  //     title: 'Analytics',
  //     transKey: 'nav.analytics.analytics',
  //     Icon: ChartBarIcon,
  // },
  // {
  //     id: 'settings',
  //     type: NAV_TYPE_ITEM,
  //     path: '/settings',
  //     title: 'Settings',
  //     transKey: 'nav.settings.settings',
  //     Icon: Cog6ToothIcon,
  // },
  // {
  //     id: 'apps',
  //     type: NAV_TYPE_ITEM,
  //     path: '/apps',
  //     title: 'Applications',
  //     transKey: 'nav.apps.apps',
  //     Icon: AppsIcon,
  // },
  // {
  //     id: 'prototypes',
  //     type: NAV_TYPE_ITEM,
  //     path: '/prototypes/onboarding/onboarding-1',
  //     title: 'Prototypes',
  //     transKey: 'nav.prototypes.prototypes',
  //     Icon: PrototypesIcon,
  // },
  // {
  //     id: 'tables',
  //     type: NAV_TYPE_ITEM,
  //     path: '/tables/orders-datatable-1',
  //     title: 'Tables',
  //     transKey: 'nav.tables.tables',
  //     Icon: TableIcon,
  // },
  // {
  //     id: 'forms',
  //     type: NAV_TYPE_ITEM,
  //     path: '/forms/input',
  //     title: 'Forms',
  //     transKey: 'nav.forms.forms',
  //     Icon: FormsIcon,
  // },
  // {
  //     id: 'components',
  //     type: NAV_TYPE_ITEM,
  //     path: '/components/basic-ui/avatar',
  //     title: 'Components',
  //     transKey: 'nav.components.components',
  //     Icon: ComponentsIcon,
  // },
  // {
  //     id: 'docs',
  //     type: NAV_TYPE_ITEM,
  //     path: '/docs/getting-started',
  //     title: 'Documentation',
  //     transKey: 'nav.docs.docs',
  //     Icon: LampIcon,
  // }
];
