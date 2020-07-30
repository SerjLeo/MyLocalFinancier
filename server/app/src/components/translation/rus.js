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
        deposit: {
          titleText: "Пополнить счет",
          buttonText: "Пополнить",
          amount: 'Сумма',
          currency: 'Валюта'
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
        expense: {
          titleText: "Добавить списание",
          buttonText: "Добавить",
          income: 'Счет',
          title: 'Название',
          amount: 'Сумма',
          currency: 'Валюта',
          category: 'Категория'
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
    LandingPage: {
      loginBtn: 'Войти',
      registerBtn: 'Зарегистрироваться',
      welcomeText: 'Управляйте своими финансами эффективно'
    },
    Confirm: {
      titleText: 'Адрес электронной почты успешно подтвержден!',
      buttonText: 'войти'
    },
    IncomeTabs:{
      depositTab: 'Пополнить счет',
      expenseTab: 'Добавить расход'
  },
  IncomeDashboard: {
    infoText: 'Добавляйте счета для управления средствами',
    title: 'Счета'
  },
  CategoriesDashboard: {
    infoText: 'Добавляйте категории для сортировки расходов',
    title: 'Категории'
  },
  LastTransactions: {
    title: 'Последние транзакции',
    loadMoreButtonText: 'Показать больше'
  },
  Welcome: {
    greetings: 'Добро пожаловать, '
  },
  AddExpense: {
    title: 'Добавить расход'
  }
};