import { NAV_TYPE_ITEM, } from "constants/app.constant";
import DashboardsIcon from 'assets/dualicons/dashboards.svg?react'
// import { 
// //   DocumentTextIcon, 
// //   ChatBubbleLeftRightIcon, 
// //   UsersIcon, 
// //   ChartBarIcon, 
// //   Cog6ToothIcon 
// } from '@heroicons/react/24/outline'

export const baseNavigation = [
    {
        id: 'dashboard',
        type: NAV_TYPE_ITEM,
        path: '/dashboard',
        title: 'Dashboard',
        transKey: 'nav.dashboard.dashboard',
        Icon: DashboardsIcon,
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
]
