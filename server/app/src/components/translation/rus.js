import {Typography} from "@material-ui/core";
import React from "react";

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
        income: 'Счет',
        title: 'Название',
        amount: 'Сумма',
        category: 'Категория',
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
  AddTransaction: {
    title: 'Добавить транзакцию'
  },
  Alert: {
    negativeBalance: 'На этом счете недостаточно средств',
    registerSuccess: 'Регистрация прошла успешно!',
    transactionAdded: 'Транзакция добавлена',
    needAuth: 'Необходима авторизация'
  },
  RecentTransactions: {
    title: 'Последние транзакции'
  }
};
