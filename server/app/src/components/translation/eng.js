export default {
    Form: {
        login: {
            buttonText: 'Sign in',
            titleText: 'Sign In',
            email: 'Email',
            password: 'Password',
            redirectText: "Don't have an account? Sign up"
        },
        register: {
            buttonText: 'Sign up',
            titleText: 'Sign Up',
            name: 'Name',
            email: 'Email',
            password: 'Password',
            password_2: 'Confirm password',
            redirectText: "Already have an account? Sign in"
        },
        deposit: {
            titleText: "Add deposit",
            buttonText: "Add",
            amount: 'Amount',
            currency: 'Currency'
        },
        income: {
            titleText: "Add income",
            buttonText: "Add",
            title: 'Name',
            type: 'Type',
            currency: 'Currency',
            balance: 'Balance'
        },
        category: {
            titleText: "Add category",
            buttonText: "Add",
            title: 'Name',
            icon: 'Icon',
            color: 'Color',
            description: 'Description'
        },
        expense: {
            titleText: "Add expense",
            buttonText: "Add",
            income: 'Income',
            title: 'Title',
            amount: 'Amount',
            category: 'Category',
            currency: 'Currency'
        },
        profile: {
            titleText: "Profile Settings",
            buttonText: "Save",
            name: 'Name',
            location: 'Location',
            phone: 'Phone',
            language: 'Language',
            mainCurrency: 'Main Currency',
            backButtonText: 'Back'
        }
    },
    AddTransactionForm: {
        titleText: "Add transaction",
        buttonText: "Add",
        income: 'Income *',
        title: 'Title',
        amount: 'Amount',
        category: 'Category *',
        currency: 'Currency',
        currentBalance: 'Balance:'
    },
    LandingPage: {
        loginBtn: 'Login',
        registerBtn: 'Register',
        welcomeText: 'Manage you finance effectively',
        subtitle: 'Make your Mom proud!'
    },
    Confirm: {
        titleText: 'Email successfully confirmed!',
        buttonText: 'move to login'
    },
    IncomeDashboard: {
        infoText: 'Add incomes to manage your finance',
        title: 'Incomes'
    },
    IncomeCatalog: {
        title: 'Incomes',
        analytics: 'Analytics'
    },
    IncomePage: {
        title: 'About income',
        analytics: 'Analytics'
    },
    CategoryPage: {
        title: 'About category',
        analytics: 'Analytics'
    },
    CategoriesDashboard: {
        infoText: 'Add categories to sort transactions',
        title: 'Categories'
    },
    CategoriesCatalog: {
        title: 'Categories',
        analytics: 'Analytics'
    },
    LastTransactions: {
        title: 'Last transactions',
        loadMoreButtonText: 'More transactions'
    },
    Welcome: {
        greetings: 'Welcome, '
    },
    AddTransaction: {
        title: 'Add transaction'
    },
    Alert: {
        negativeBalance: 'There are insufficient funds in the account',
        registerSuccess: 'Registered successfully!',
        transactionAdded: 'Transaction added successfully',
        confirmationSend: 'Email with confirmation sent to your address',
        transactionDeleted: 'Transaction deleted',
        needAuth: 'Authorization required',
        incomeDeleted: 'Income deleted',
        categoryDeleted: 'Category deleted',
        incomeAdded: 'Income Added',
        categoryAdded: 'Category Added',
        emailConfirmed: 'Email successfully confirmed!'
    },
    RecentTransactions: {
        title: 'Recent Transactions',
        toAll: 'All transactions',
        empty: 'No transactions yet...'
    },
    TransactionsList: {
        title: 'Transaction History',
        loadMore: 'Load more',
        empty: 'No transactions yet...'
    },
    Footer: {
        rights: 'All rights reserved'
    },
    Searchbar: {
        all: 'All...',
        incomes: 'Incomes',
        categories: 'Categories'
    },
    AnalyticsFilters: {
        currency: 'Currency',
        type: 'Type',
        all: 'All...',
        from: 'From',
        to: 'To',
        timePeriod: 'Time period',
        month: 'Month',
        year: 'Year',
        income: 'Income',
        category: 'Category',
        allTime: 'All time',
        customPeriod: 'Customize',
        months: {
            'Jan': 'January',
            'Feb': 'February',
            'Mar': 'March',
            'Apr': 'April',
            'May': 'May',
            'Jun': 'June',
            'Jul': 'July',
            'Aug': 'August',
            'Sep': 'September',
            'Oct': 'October',
            'Nov': 'November',
            'Dec': 'December'
        }
    },
    Analytics: {
        incomes: 'Incomes',
        categories: 'Categories'
    },
    Menu: {
        title: 'Menu',
        analytics: 'Analytics',
        dashboard: 'Dashboard',
        transactions: 'Transactions',
        incomes: 'Incomes',
        categories: 'Categories',
        settings: 'Settings',
        allAnalytics: 'Analytics navigation',
        byIncomes: 'By incomes',
        byCategories: 'By categories',
        byTypes: 'Deposits/Expenses'
    },
    Header: {
        register: 'Register',
        login: 'Login',
        logout: 'Logout',
        settings: 'Settings'
    },
    EmptyData: {
        empty: 'No data'
    },
    DeleteDialog: {
        delete: 'Delete',
        cancel: 'Cancel',
        incomeTitle: 'Delete income',
        categoryTitle: 'Delete category',
        deleteRelative: 'Delete related transactions',
        deleteIncomeDescription: 'Not deleted transactions may be not allowed in certain analytics, but in global makes it more accurate',
        deleteCategoryDescription: 'This category will be excluded from analytics. Do not delete this category, if it has many related transactions!'
    }
};
