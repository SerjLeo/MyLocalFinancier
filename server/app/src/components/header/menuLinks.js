import React from 'react'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PieChartIcon from '@material-ui/icons/PieChart';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default {
    menu: [
        {
            text: 'Dashboard',
            link: '/dashboard',
            icon: <DashboardIcon/>
        },
        {
            text: 'Transactions',
            link: '/expenses',
            icon: <SwapHorizIcon/>
        },
        {
            text: 'Incomes',
            link: '/incomes',
            icon: <MonetizationOnIcon/>
        },
        {
            text: 'Categories',
            link: '/categories',
            icon: <CategoryIcon/>

        },
        {
            text: 'Options',
            link: '/options',
            icon: <SettingsIcon/>
        }
    ],
    analytics: [
        {
            text: 'All analytics',
            link: '/analytics',
            icon: <AssessmentIcon/>
        },
        {
            text: 'Transactions',
            link: '/analytics/transactions',
            icon: <ImportExportIcon/>
        },
        {
            text: 'By categories',
            link: '/analytics/categories',
            icon: <PieChartIcon/>
        }
    ]
}
