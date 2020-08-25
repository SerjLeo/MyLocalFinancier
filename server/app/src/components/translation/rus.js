export default {
    Form: {
        login: {
          buttonText: 'Войти',
          titleText: 'Вход',
          email: 'Email',
          password: 'Пароль',
          redirectText: "У Вас нет аккаунта? Зарегистрируйтесь"
        },
        register: {
          buttonText: 'Зарегистрироваться',
          titleText: 'Регистрация',
          name: 'Имя',
          email: 'Email',
          password: 'Пароль',
          password_2: 'Подтвердите пароль',
          redirectText: "У Вас уже есть аккаунт? Войти"
        },
        income: {
          titleText: "Добавить счет",
          buttonText: "Добавить",
          title: 'Имя',
          type: 'Тип',
          currency: 'Валюта',
          balance: 'Баланс'
        },
        category: {
          titleText: "Добавить категорию",
          buttonText: "Добавить",
          title: 'Имя',
          icon: 'Иконка',
          color: 'Цвет',
          description: 'Описание'
        },
        profile: {
          titleText: "Настройки профиля",
          buttonText: "Сохранить",
          name: 'Имя',
          location: 'Местоположение',
          phone: 'Номер телефона',
          language: 'Язык',
          mainCurrency: 'Основная валюта',
          backButtonText: 'Назад'
        }
    },
    AddTransactionForm: {
        titleText: "Добавить транзакцию",
        buttonText: "Добавить",
        income: 'Счет *',
        title: 'Название',
        amount: 'Сумма',
        category: 'Категория *',
        currency: 'Валюта',
        currentBalance: 'Средств на счете:'
    },
    LandingPage: {
        loginBtn: 'Войти',
        registerBtn: 'Зарегистрироваться',
        welcomeText: 'Управляйте своими финансами эффективно'
    },
    Confirm: {
        titleText: 'Адрес электронной почты успешно подтвержден!',
        buttonText: 'войти'
    },
    IncomeDashboard: {
        infoText: 'Добавляйте счета для управления средствами',
        title: 'Счета'
    },
    IncomeCatalog: {
        title: 'Счета',
        analytics: 'Аналитика'
    },
    IncomePage: {
        title: 'Подробности счета',
        analytics: 'Аналитика'
    },
    CategoryPage: {
        title: 'Подробности категории',
        analytics: 'Аналитика'
    },
    CategoriesDashboard: {
        infoText: 'Добавляйте категории для сортировки расходов',
        title: 'Категории'
    },
    CategoriesCatalog: {
        title: 'Категории',
        analytics: 'Аналитика'
    },
    LastTransactions: {
        title: 'Последние транзакции',
        loadMoreButtonText: 'Показать больше'
    },
    Welcome: {
        greetings: 'Добро пожаловать, '
    },
    AddTransaction: {
        title: 'Добавить транзакцию'
    },
    Alert: {
        negativeBalance: 'На этом счете недостаточно средств',
        registerSuccess: 'Регистрация прошла успешно!',
        confirmationSend: 'Письмо с подтверждением отправленно на указанный почтовый адрес',
        transactionAdded: 'Транзакция добавлена',
        transactionDeleted: 'Транзакция удалена',
        needAuth: 'Необходима авторизация',
        incomeDeleted: 'Счет удален',
        categoryDeleted: 'Категория удалена',
        incomeAdded: 'Счет добавлен',
        categoryAdded: 'Категория добавлена',
        emailConfirmed: 'Адрес электронной почты подтвержден!'
    },
    RecentTransactions: {
        title: 'Последние транзакции',
        toAll: 'Все транзакции',
        empty: 'Пока транзакций нет...'
    },
    TransactionsList: {
        title: 'История транзакций',
        loadMore: 'Загрузить больше',
        empty: 'Пока транзакций нет...'
    },
    Footer: {
        rights: 'Все права защищены'
    },
    Searchbar: {
        all: 'Все...',
        incomes: 'Счета',
        categories: 'Категории'
    },
    AnalyticsFilters: {
        currency: 'Валюта',
        type: 'Тип',
        from: 'От',
        to: 'До',
        timePeriod: 'Временной период',
        month: 'Месяц',
        all: 'Все...',
        income: 'Счет',
        category: 'Категория',
        year: 'Год',
        allTime: 'Все время',
        customPeriod: 'Настроить',
        months: {
            'Jan': 'Январь',
            'Feb': 'Февраль',
            'Mar': 'Март',
            'Apr': 'Апрель',
            'May': 'Май',
            'Jun': 'Июнь',
            'Jul': 'Июль',
            'Aug': 'Август',
            'Sep': 'Сентябрь',
            'Oct': 'Октябрь',
            'Nov': 'Ноябрь',
            'Dec': 'Декабрь'
        }
    },
    Analytics: {
        incomes: 'Счета',
        categories: 'Категории'
    },
    Menu: {
        title: 'Меню',
        analytics: 'Аналитика',
        dashboard: 'На главную',
        transactions: 'Транзакции',
        incomes: 'Счета',
        categories: 'Категории',
        settings: 'Настройки',
        allAnalytics: 'Аналитика',
        byIncomes: 'По счетам',
        byCategories: 'По категориям',
        byTypes: 'Доходы/Расходы'
    },
    Header: {
        register: 'Регистрация',
        login: 'Вход',
        logout: 'Выход',
        settings: 'Настройки'
    },
    EmptyData: {
        empty: 'Нет данных'
    },
    DeleteDialog: {
        delete: 'Удалить',
        cancel: 'Отмена',
        incomeTitle: 'Удалить счет',
        categoryTitle: 'Удалить категорию',
        deleteRelative: 'Удалить связанные транзакции',
        deleteIncomeDescription: 'Неудаленные транзакции будут не доступны в некторых видах аналитики, однако, в общем, сделают ее более точной',
        deleteCategoryDescription: 'Эта категория будет также исключена из аналитики. Не удаляйте ее, если к ней относятся много транзакций!'
    }
};
