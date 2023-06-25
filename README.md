
# Дипломный Проект (Backend): Movies explorer 

![Проект: Movies explorer (Backend)](./readme.png)

[Репозиторий backend части дипломной проектной](https://github.com/EliseyE/movies-explorer-api/ "Репозиторий backend части дипломной проектной")

## Ссылки на проект

IP 84.201.142.103

Backend https://api.mexp.nomoredomains.rocks

Frontend https://mexp.nomoredomains.rocks

#

## О проекте

Перед вами backend приложения - первая часть дипломной работы студента Яндекс Практикум курса Веб-разработчик.  Приложение даёт возможность искать и сохранять в своём профиле понравившиеся фильмы, размещенные в сервисе beatfilm-movies.

#

## Роуты

POST `/signup` - создаёт пользователя с переданными в теле
email, password и name

POST `/signin` - проверяет переданные в теле почту и пароль и возвращает JWT

POST `/jwtcheck` - проверяет JWT cookies, положительный ответ - 200 и id пользователя

POST `/logout` - удаляет JWT из cookies

GET `/users/me` - возвращает информацию о пользователе (email и имя)

PATCH `/users/me` - обновляет информацию о пользователе (email и имя)

GET `/movies` - возвращает все сохранённые текущим  пользователем фильмы

POST `/movies` - создаёт фильм с переданными в теле:
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 

DELETE `/movies/_id` - удаляет сохранённый фильм по id


## Директории

`/routes` — папка с файлами роутера   
`/controllers` — папка с файлами контроллеров пользователя, фильма выхода и проверки токена   
`/models` — папка с файлами описания схем пользователя и фильма   
`/errors` — папка с файлами ошибок  
`/middlewares` — папка с файлами middlewares   
`/utils` — папка с файлами вспомогательных частей программы

## Запуск проекта

`npm run start` — запускает сервер  
`npm run dev` — запускает dev-сервер с hot-reload  
`npm run lint` — запускает прокерку кода eslint

## Технологии
Server: NodeJS and express, DB: MongoDB

  ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![NodeJS](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Функциональность
Сервер может:
* Зарегистрировать пользователя;
* Авторизовать пользователя;
* Отередактировать данные пользователя;
* Передать список сохранненных фильмов пользователя;
* Добавлять и удалять свои сохраненные фильмы;
* Предусмотрена валидация входящих данных, обработка запросов и ошибок.

## Планы
Продолжить разработку приложения: клиентская часть (frontend) - вёрстка и функциональная часть.

