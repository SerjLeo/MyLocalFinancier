import React from 'react'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PieChartIcon from '@material-ui/icons/PieChart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default {
    menu: [
        {
            text: 'dashboard',
            link: '/dashboard',
            icon: <DashboardIcon/>
        },
        {
            text: 'transactions',
            link: '/transactions',
            icon: <SwapHorizIcon/>
        },
        {
            text: 'incomes',
            link: '/incomes',
            icon: <MonetizationOnIcon/>
        },
        {
            text: 'categories',
            link: '/categories',
            icon: <CategoryIcon/>

        }
        // {
        //     text: 'settings',
        //     link: '/settings',
        //     icon: <SettingsIcon/>
        // }
    ],
    analytics: [
        {
            text: 'allAnalytics',
            link: '/analytics',
            icon: <AssessmentIcon/>
        },
        {
            text: 'byIncomes',
            link: '/analytics/incomes',
            icon: <CreditCardIcon/>
        },
        {
            text: 'byCategories',
            link: '/analytics/categories',
            icon: <PieChartIcon/>
        },
        {
            text: 'byTypes',
            link: '/analytics/types',
            icon: <SyncAltIcon/>
        }
    ]
}
