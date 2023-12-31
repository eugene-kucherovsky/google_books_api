<h1 align="center">Google Books API Search</h1>

> EN: Online book search service using Google Books API.

> RU: Онлайн сервис по поиску книг с использованием Google Books API.

### Команда для запуска сборки Docker-контейнера:

docker-compose up -d

---

Стек технологий:

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev)
- [Vitest](https://vitest.dev)
- [Cypress](https://www.cypress.io)
- [React](https://react.dev)
- [React Router](https://reactrouter.com/en/main)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Prettier](https://prettier.io/)

<details>
  <summary>Задание</summary>

Необходимо разработать React-приложение поиска книг с помощью Google Books API.
Документация: [Google Books](https://developers.google.com/books/docs/v1/using). Для авторизации запросов к API выбрать
способ с предоставлением [Google Books API key](https://developers.google.com/books/docs/v1/using#APIKey).

- Должны быть текстовое поле и кнопка поиска. По введенной пользователем подстроке производится поиск книг. Триггером к
  поиску является либо нажатие Enter (когда текстовое поле в фокусе), либо нажатие кнопки поиска.
- Фильтрация по категориям. Ниже текстового поля располагается селект с категориями: all, art, biography, computers,
  history, medical, poetry. Если выбрано "all" (выбрано изначально), то поиск производится по всем категориям.
- Сортировка. Рядом с селектом категорий находится селект с вариантами сортировки: relevance (выбран изначально),
  newest.
- Найденные книги отображаются карточками, каждая из которых состоит из изображения обложки книги, названия книги,
  названия категории и имен авторов. Если для книги приходит несколько категорий, то отображается только первая. Авторы
  отображаются все. Если не приходит какой-либо части данных, то вместо нее просто пустое место.
- Над блоком с карточками отображается количество найденных по запросу книг.
- Пагинация реализована по принципу 'load more'. Ниже блока с карточками находится кнопка 'Load more', по клику на нее к
  уже загруженным книгам подгружаются еще. Шаг пагинации - 30.
- При клике на карточку происходит переход на детальную страницу книги, на которой выводятся ее данные: изображение
  обложки, название, все категории, все авторы, описание.

#### Технические требования

- Обязательно использование Redux/MobX.
- Желательно Typescript.
- Во время загрузки книг необходимо показать индикатор загрузки.
- Допускается использовать UI-фреймворк для отображения данных.

#### Дополнительные требования

- Финальный билд должен запускаться из Docker-контейнера.

</details>

<details>
  <summary>Выполненные требования</summary>

#### Технические требования

- [x] Приложение написано на React, TypeScript.
- [x] State-менеджер Redux Toolkit.
- [x] Приложение разбито на компоненты, отформатировано Prettier Code Formatter.
- [x] Код чистый и читабельный, отсутствует дублирование кода.
- [x] Выполнен responsive design под любые мобильные устройства
      с шириной зкрана от 320 пикселей.
      Хавер эффекты на элементах доступны на экранах с шириной от 1280 пикселей.
- [x] Корректное отображение в браузерах Chrome, Vivaldi, Firefox, Edge.

#### Дополнительные требования

- [x] Финальный билд запускается из Docker-контейнера.

#### Описание приложения

1. Домашняя страница

   - [x] При входе в приложение отображается шапка (search-bar) приложения с формой поиска.
   - [x] По-умолчанию поиск книг осуществляется со следующими параметрами:

     - Запрос (query): all.
     - Категории (categories): all.
     - Сортировка (sort by): relevance.
     - Загружаемые результаты фильтруются по уникальному ID.

   - [x] Отображается счетчик результатов запроса (количество
         найденных книг).
   - [x] Присутствует кнопка подгрузки 'Показать больше' (появляется после первого успешно выполненного запроса).
   - [x] Присутствует кнопка скролла к началу страницы '^' (появляется после первого успешно выполненного запроса).
   - [x] При нажатии на карточку книги происходит переход на страницу с описанием книги.
   - [x] Индикатор загрузки.
   - [x] Обработка ошибок.

2. Страница с подробными описаниями книги

   - [x] При загрузке книги отображается изображение её обложки.
   - [x] Элемент в стиле "хлебных крошек" с категориями,
         в которые входит загруженная книга.
   - [x] Элемент с названием книги.
   - [x] Элемент с авторами книги.
   - [x] Элемент с детальным описанием повествования книги.
   - [x] Индикатор загрузки.
   - [x] Обработка ошибок.

3. Форма поиска

   - [x] Search input, submit button.
   - [x] Выбор категории.
   - [x] Выбор сортировки.

4. Для тестирования приложения написаны автотесты Vitest и Cypress.

</details>

![screenshot](./screenshots/screenshot.png)
